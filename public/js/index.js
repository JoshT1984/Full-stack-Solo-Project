getThemeData();
getDate();
buttonClick();
// ---------------------------------------------------------GET THEME DATA-------------------------------------------------------
async function getThemeData() {
  try {
    let bgColorArray = [];
    let textColorArray = [];

    let listData = await $.get("/lists/themes");
    listData.forEach((colors) => {
      bgColorArray.push(colors.background_color);
      textColorArray.push(colors.text_color);
    });
    let $body = $("body");
    // $body.on("click", function () {
    //   let random = Math.floor(Math.random() * 8);
    //   $body.css({
    //     "background-color": bgColorArray[random],
    //     color: textColorArray[random],
    //   });
    // });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
// ----------------------------------------------------------------------GET DATE------------------------------------------------------------------------------
function getDate() {
  const date = new Date();
  let $date = $(".date_and_time").html(date.toDateString());
}
// ----------------------------------------------------------------------------------GET USER DATA-----------------------------------------------------
async function getUserData() {
  try {
    const $userH1 = $(".h1_firstname");
    let userData = await $.get("/lists/users");
    if (userData.length === 0) {
      console.log("No Users Exist");
    } else {
      userData.forEach((user) => {
        $userH1.text(`Hello, ${user.firstname}`);
      });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
// --------------------------------------------------------------------------------POST FOR USER---------------------------------------------------
function buttonClick() {
  let $addTodo = $(".add-todo");
  let $submitBtn = $(".submit");

  $submitBtn.on("click", function (e) {
    let $inputOne = $(".firstname").val();
    if ($inputOne.length > 0) {
      e.preventDefault();
      $(".form-container").hide();

      let formData = fetch("/lists/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: $inputOne,
        }),
      })
        .then((data) => {
          console.log("Success:", data);
          $addTodo.css("display", "flex");
          getUserData();
          showTodoTable();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Enter name");
    }
  });
}

function showTodoTable() {
  let $addTodo = $(".add-todo");
  let $imgTodo = $(".img-todo");
  let $tableData = $(".table-data");

  $imgTodo.on("click", function () {
    $tableData.css("display", "grid");
    $addTodo.hide();
  });
}
