getThemeData();
getDate();
getUserData();

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
    $body.on("click", function () {
      let random = Math.floor(Math.random() * 8);
      $body.css({
        "background-color": bgColorArray[random],
        color: textColorArray[random],
      });
    });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function getDate() {
  const date = new Date();
  let $date = $(".date_and_time").html(date.toDateString());
}

async function getUserData() {
  try {
    let userArray = [];
    let userData = await $.get("/lists/users");
    if (userData.length === 0) {
      console.log("No Users Exist");
    } else {
      userData.forEach((user) => {
        console.log(user);
      });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function buttonClick() {
  $("#submit").on("click", function (e) {
    e.preventDefault();

    let $inputOne = $(".firstname").val();
    let $inputTwo = $(".lastname").val();
    let formData = fetch("/cards/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: $inputOne,
        lastname: $inputTwo,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
