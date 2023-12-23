getThemeData();
getDate();

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
      getUserData();
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
