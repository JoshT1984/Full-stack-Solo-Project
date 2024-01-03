let userId;
let $imgEdit;
let $dataComplete_By;
let taskTracker = 0;
let indexTracker;

render();

function render() {
  setInitialTheme();
  clickToViewThemes();
  buttonClick();
  taskTable();
  listSelect();
  getDate();
}

// ----------------------------------------------------------------------GET DATE FROM API-------------------------------------------------------------------
function getDate() {
  const date = new Date();
  let $date = $(".date_and_time").html(date.toDateString());
}

function listSelect() {
  const $listSelect = $(".list_select").on("click", function () {
    const loadEJSGrocery = $.get("/lists/grocery");
    window.location.href = "/lists/grocery";
  });
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

  // ---------------------------------------------------------POST Username Event Listener------------------------------------
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

  // ---------------------------------------------------------Show Todolist Event Listener------------------------------------
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
  const $userH1 = $(".h1_firstname");

  let $todoInputs = $(".todo-form-wrapper");
  let $tableDataBtn = $(".submit-todo");

  // ---------------------------------------------------------Task Table Event Listener------------------------------------
  $tableDataBtn.on("click", function (e) {
    let $inputOne = $(".task").val();
    let $inputTwo = $(".complete_by").val();

    let $imgSpan = $("<img/>")
      .attr("src", "../assets/images/icons/trash3.png")
      .addClass(`trashicon trash${taskTracker}`);
    $imgEdit = $("<img/>")
      .attr("src", "../assets/images/icons/edit_icon.png")
      .addClass(`editicon edit${taskTracker}`);

    let $checkbox = $(`<input type="checkbox" />`).addClass("checkbox");
    e.preventDefault();

    if ($inputOne.length > 0) {
      console.log("good job");
    } else {
      console.log("Enter a task");
      return;
    }
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

        let $tableRow = $("<tr/>").addClass(`_${taskTracker}`);
        let $trashEditDiv = $("<div/>").addClass("trashEditDiv");
        let $dataTask = $("<td/>")
          .text($inputOne)
          .addClass("task" + taskTracker)
          .css({ "max-width": "600px", borderBottom: 0, borderTop: 0 });
        $dataTask.addClass("data");

        let $dataComplete_By = $("<td/>")
          .text($inputTwo)
          .addClass("complete" + taskTracker)
          .css({ "max-width": "200px", borderBottom: 0, borderTop: 0 });
        $dataComplete_By.addClass("has-text-centered");
        $dataComplete_By.addClass("data");

        $trashEditDiv.prepend($imgSpan, $imgEdit, $dataTask);

        $tableRow.append($trashEditDiv, $dataComplete_By, $checkbox);
        $tableBody.append($tableRow);
        $tableData.css("display", "block");
        $addTodo.show();
        $userH1.remove();
        setInitialTheme();
        clickToViewThemes();
        deleteTodoTask();
        updateTodoTask();
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
// -----------------------------------------------------Function for theme color change functionality-----------------------------------
async function clickToViewThemes() {
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
  let rowColor;

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

  // ---------------------------------------------------------Theme Change Event Listener------------------------------------
  $("#themes").on("click", function () {
    let $th = $("th");
    let $tbody = $("tbody");
    const $footer = $("footer");
    let $dateColor = $(".date_and_time");
    let $copyright = $("#copyright");

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

      $html.css({
        "background-color": themeArray[5],
        color: themeArray[6],
      });

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

      $th.css({
        "background-color": themeArray[2],
        "border-bottom": `2px ${themeArray[2]} solid`,
        "border-left": `2px ${themeArray[2]} solid}`,
      });
      $tbody.css({
        "border-top": `2px ${themeArray[2]} solid`,
        "border-right": `2px ${themeArray[2]} solid`,
        "border-bottom": `2px ${themeArray[2]} solid`,
        "border-left": `4px ${themeArray[2]} solid}`,
      });

      $footer.css({
        "background-color": themeArray[2],
        color: themeArray[6],
      });

      $dateColor.css("color", themeArray[6]);
      $copyright.css("color", themeArray[6]);
      rowColor = themeArray[2];
      $("#myTable tr:nth-child(even)").css("background-color", themeArray[2]);
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
  const $th = $("th");
  const $tbody = $("tbody");
  const $footer = $("footer");
  let themeArray;
  let $dateColor = $(".date_and_time");
  let $copyright = $("#copyright");
  let $evenRows = $("#myTable tr:nth-child(even)");

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

    $html.css({
      "background-color": themeArray[5],
      color: themeArray[6],
    });

    $button.css({
      border: `${themeArray[7]} solid 5px`,
      "background-color": themeArray[2],
      color: themeArray[6],
    });
    $navbarColor.css({
      "background-color": themeArray[2],
      color: themeArray[6],
    });

    $footer.css({
      "background-color": themeArray[2],
      color: themeArray[6],
    });

    $dateColor.css("color", themeArray[6]);
    $copyright.css("color", themeArray[6]);

    $inputs.css({ "background-color": themeArray[3], color: themeArray[6] });
    $thead.css({ "background-color": themeArray[2] });
    $h1.css("color", themeArray[6]);
    $h2.css("color", themeArray[6]);
    $trashcan.css("background-color", themeArray[2]);

    $th.css({
      "border-bottom": `2px ${themeArray[2]} solid`,
      //   "border-right": `2px ${themeArray[2]} solid`,
      //   "border-bottom": `3px ${themeArray[2]} solid`,
      "border-left": `2px ${themeArray[2]} solid}`,
      //   opacity: 0.8,
    });
    $tbody.css({
      "border-top": `2px ${themeArray[2]} solid`,
      "border-right": `2px ${themeArray[2]} solid`,
      "border-bottom": `2px ${themeArray[2]} solid`,
      "border-left": `4px ${themeArray[2]} solid}`,
      opacity: 0.8,
    });

    $evenRows.css("background-color", themeArray[2]);
  }
}

function updateTodoTask() {
  let $dataTask = $(".task" + taskTracker);
  let $completeTask = $(".complete" + taskTracker);
  let btnClass;
  let $lastIndexString;
  let $updateInputs = $(".update_form_wrapper");
  let $addTodo = $(".add-todo");
  let $taskEdit;
  let $dateEdit;
  let $submitUpdate = $(".submit_update");

  // -------------------------------------------------------Edit Button Event Listener------------------------------------
  $imgEdit.off("click").on("click", function () {
    ///////////////////////////GETS CLASS OF ELEMENT/////////////////////////////////////////////
    btnClass = $(this).attr("class"); ///////////////////////////GETS CLASS OF ELEMENT/////////////////////////////////////////////
    $lastIndexString = btnClass.slice(-1).toString();
    $updateInputs.css("display", "flex");
    $addTodo.hide();
    indexTracker = $lastIndexString;
    $dataTask.attr("class", `task${indexTracker}`);
    $completeTask.attr("class", `complete${indexTracker}`);
  });

  // ---------------------------------------------------------Submit Update Event Listener------------------------------------------------
  $submitUpdate.on("click", function (e) {
    e.preventDefault();

    $lastIndexString = indexTracker;

    $taskEdit = $(".task_update").val();
    $dateEdit = $(".complete_by_update").val();
    fetch(`/lists/todo/${indexTracker}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: $taskEdit,
        complete_by: $dateEdit,
        user_id: userId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("IN THE THEN BLOCK");
        $(`.task${indexTracker}`).html($taskEdit);
        $(`.complete${indexTracker}`).html($dateEdit);
        $addTodo.show();
        $updateInputs.hide();
        console.log(`PATCH request successful:`, data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

// ----------------------------------------------------------------FUNCTION TO DELETE TASKS ------------------------------------------------------
async function deleteTodoTask() {
  try {
    let $tableRow = $(`._${taskTracker}`);
    let $trashBtn = $(".trash" + taskTracker);
    let getTaskData = await $.get("/lists/todo/");

    // ---------------------------------------------------------Delete Table Row Event Listener------------------------------------
    $trashBtn.on("click", function () {
      let btnClass = $(this).attr("class"); ///////////////////////////GETS CLASS OF ELEMENT/////////////////////////////////////////////
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
