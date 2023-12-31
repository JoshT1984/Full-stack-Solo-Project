let userId;
// getDate();
buttonClick();
taskTable();
let taskTracker = 0;
clickToViewThemes();

// ----------------------------------------------------------------------GET DATE------------------------------------------------------------------------------
// function getDate() {
//   const date = new Date();
//   let $date = $(".date_and_time").html(date.toDateString());
// }
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
        userId = user.user_id.toString();
      });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
// --------------------------------------------------------------------------------POST Method to add user---------------------------------------------------
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
          showTodoInput();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error("Enter name");
    }
  });
}
// -----------------------------------------------------Function to show todo selection----------------------------------
function showTodoInput() {
  let $addTodo = $(".add-todo");
  let $imgTodo = $(".img-todo");
  let $todoInputs = $(".todo-form-wrapper");

  $imgTodo.on("click", function () {
    taskTracker++;
    $todoInputs.css("display", "flex");
    $addTodo.hide();
  });
}
// ---------------------------------------------------------------------------------Function to show TASK TABLE-----------------------------------
function taskTable() {
  let $addTodo = $(".add-todo");
  let $tableData = $(".table");
  let $tableBody = $(".tbody-todo");
  let $inputOne;
  let $inputTwo;
  const $userH1 = $(".h1_firstname");

  let $todoInputs = $(".todo-form-wrapper");
  let $tableDataBtn = $(".submit-todo");
  $tableDataBtn.on("click", function (e) {
    $inputOne = $(".task").val();
    $inputTwo = $(".complete_by").val();
    let $imgSpan = $("<img/>")
      .attr("src", "../images/icons/trash3.png")
      .addClass("trash" + taskTracker);
    let $checkbox = $(`<input type="checkbox" />`).addClass("checkbox");
    e.preventDefault();

    let todoData = fetch("/lists/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: $inputOne,
        complete_by: $inputTwo,
      }),
    })
      .then((data) => {
        console.log("Success:", data);
        $todoInputs.hide();

        let $dataTask = $("<td/>").text($inputOne).prepend($imgSpan);
        let $dataComplete_By = $("<td/>").text($inputTwo).append($checkbox);
        let $tableRow = $("<tr/>").append($dataTask);
        $tableRow.addClass(`_${taskTracker}`);

        $tableRow.append($dataComplete_By);
        $tableBody.append($tableRow);
        $tableData.css("display", "block");
        $addTodo.show();
        $userH1.remove();
        deleteTodoTask();
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
// -----------------------------------------------------Function for theme color change functionality-----------------------------------
async function clickToViewThemes() {
  setInitialTheme();
  const $themeform = $("#theme-form");
  const $themeBtn = $(".theme_change");
  const listData = await $.get("/lists/themes");
  const $tableBody = $(".tbody-todo");
  const $html = $("html");
  const $navbarColor = $("nav");
  const $button = $("button");
  const $inputs = $("input[type = text]");
  const $thead = $(".sticky-header");
  const $h1 = $("h1");
  const $h2 = $("h2");
  const $trashcan = $("img");
  let themeArray;

  const themeData = {
    light: { index: 0 },
    dark: { index: 1 },
    new_year: { index: 2 },
    valentine: { index: 3 },
    fourth_of_july: { index: 4 },
    halloween: { index: 5 },
    thanksgiving: { index: 6 },
    xmas: { index: 7 },
  };

  $themeBtn.on("click", function (e) {
    $themeform.show();
    $themeBtn.hide();
  });

  $("#themes").on("click", function () {
    const $selectedOption = $("#themes option:selected").val();
    const selectedTheme = themeData[$selectedOption];
    $themeform.hide();
    $themeBtn.show();

    if (selectedTheme) {
      themeArray = [
        listData[selectedTheme.index].id, //0
        listData[selectedTheme.index].theme, //1
        listData[selectedTheme.index].navbar_color, //2
        listData[selectedTheme.index].input_color, //3
        listData[selectedTheme.index].table_color, //4
        listData[selectedTheme.index].background_color, //5
        listData[selectedTheme.index].text_color, //6
        listData[selectedTheme.index].border_color, //7
      ];

      $html.css({ "background-color": themeArray[5], color: themeArray[6] });
      $button.css({
        border: `${themeArray[7]} solid 5px`,
        "background-color": themeArray[2],
        color: themeArray[6],
      });
      $navbarColor.css({
        "background-color": themeArray[2],
        color: themeArray[6],
      });
      $inputs.css({ "background-color": themeArray[3], color: themeArray[6] });
      $thead.css("background-color", themeArray[2]);
      $h1.css("color", themeArray[6]);
      $h2.css("color", themeArray[6]);
      $trashcan.css("background-color", themeArray[2]);
      $tableBody.css("background-color", themeArray[4]);
    }
  });
}
// ----------------------------------------------------------------Sets Light mode as initial theme------------------------------------------------------
async function setInitialTheme() {
  const listData = await $.get("/lists/themes");
  const $themeform = $("#theme-form");
  const $themeBtn = $(".theme_change");
  const $tableBody = $(".tbody-todo");
  const $html = $("html");
  const $navbarColor = $("nav");
  const $button = $("button");
  const $inputs = $("input[type = text]");
  const $thead = $(".sticky-header");
  const $h1 = $("h1");
  const $h2 = $("h2");
  const $trashcan = $("img");
  let themeArray;

  const themeData = {
    light: { index: 0 },
    dark: { index: 1 },
    new_year: { index: 2 },
    valentine: { index: 3 },
    fourth_of_july: { index: 4 },
    halloween: { index: 5 },
    thanksgiving: { index: 6 },
    xmas: { index: 7 },
  };

  const $selectedOption = $("#themes option:selected").val();
  const selectedTheme = themeData[$selectedOption];

  if (selectedTheme) {
    themeArray = [
      listData[selectedTheme.index].id, //0
      listData[selectedTheme.index].theme, //1
      listData[selectedTheme.index].navbar_color, //2
      listData[selectedTheme.index].input_color, //3
      listData[selectedTheme.index].table_color, //4
      listData[selectedTheme.index].background_color, //5
      listData[selectedTheme.index].text_color, //6
      listData[selectedTheme.index].border_color, //7
    ];

    $html.css({ "background-color": themeArray[5], color: themeArray[6] });
    $button.css({
      border: `${themeArray[7]} solid 5px`,
      "background-color": themeArray[2],
      color: themeArray[6],
    });
    $navbarColor.css({
      "background-color": themeArray[2],
      color: themeArray[6],
    });
    $inputs.css({ "background-color": themeArray[3], color: themeArray[6] });
    $thead.css("background-color", themeArray[2]);
    $h1.css("color", themeArray[6]);
    $h2.css("color", themeArray[6]);
    $trashcan.css("background-color", themeArray[2]);
    $tableBody.css("background-color", themeArray[4]);
  }
}
// ----------------------------------------------------------------FUNCTION TO DELETE TASKS ------------------------------------------------------
async function deleteTodoTask() {
  try {
    let $tableRow = $(`._${taskTracker}`);
    let $trashBtn = $(".trash" + taskTracker);
    let getTaskData = await $.get("/lists/todo/");
    $trashBtn.on("click", function () {
      let btnClass = $(this).attr("class");
      let lastIndexString = btnClass.slice(-1).toString();
      removeAnim($($tableRow));
      const deleteTask = fetch(`/lists/todo/${lastIndexString}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    });
  } catch (error) {
    console.error(error);
  }
}
// ------------------------------------------------------------------------------REMOVE ANIMATION FUNCTION ---------------------------------------------------
function removeAnim(tablerow) {
  const $html = $("html").css("background-color");

  tablerow.css({
    position: "relative",
    "background-color": $html,
  });
  // ------------------------------------------------------------------------------USES STEP LOGIC WITH ANIMATE-----------------------------------------------------
  tablerow.animate(
    { rotation: -90 },
    {
      duration: 750,
      step: function (now, fx) {
        $(this).css({ transform: "rotate(" + now + "deg)" });
      },
    }
  );
  setTimeout(() => tablerow.animate({ top: "500px" }), 850);
  setTimeout(() => tablerow.animate({ right: "1000px" }), 1200);
  setTimeout(() => tablerow.remove(), 1500);
}
