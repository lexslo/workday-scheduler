// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours

// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future

// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

var timeDisplayEl = document.getElementById("currentDay");

var today = moment().format("MMM DD YYYY, h:mm a");
timeDisplayEl.textContent = today;

// object to hold time and task text for local storage
var scheduleObj = {};

// $(".time-block").on("click","textarea", function() {

//     var text = $(this).val();
//     console.log(text);

// });

// // editable field was un-focused
// $(".time-block").on("blur", "textarea", function() {
//     // get current value of textarea
//     var text = $(this).val();
  
//     // get which hour was clicked
//     var time = $(this)
//       .closest(".time-block")
//       .attr("id")
//       .replace("hour", "");

//     console.log(text);
//     console.log(time);

// });

// get time and text when save button is clicked, set to local storage
$(".saveBtn").on("click", function () {

    var time = $(this).parent().attr("id");
    var task = $(this).siblings(".description").val();
    
    // dynamically assign key:value pairs
    scheduleObj[time] = task;

    localStorage.setItem("event", JSON.stringify(scheduleObj));
});

function loadEvents() {
    console.log("load events function");
    scheduleObj = JSON.parse(localStorage.getItem("event")) || {};

    for (var time in scheduleObj) {
        var hourId = document.getElementById(time);
        //var hourId = $("#" + time);
        hourId.querySelector(".description").textContent = scheduleObj[time];
    }
}

loadEvents();