// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future


var timeDisplayEl = document.getElementById("currentDay");

var today = moment().format("MMM DD YYYY, h:mm a");
timeDisplayEl.textContent = today;

// object to hold time and task text for local storage
var scheduleObj = {};

// color-code time-blocks to indicate whether it is in the past, present, or future
function colorCode () {

    console.log("hour checked, color coded");

    var currentTime = moment().format("H");

    $(".time-block").each( function(i) {
        var hour = $(this).attr("id").replace("hour", "");
        hour = parseInt(hour);

        if (hour < currentTime) {
            $(this).addClass("past");
        } 
        else if (hour > currentTime) {
            $(this).addClass("future");
        } 
        else {
            $(this).addClass("present");
        }
    });
}

// get time and text when save button is clicked, set to local storage
$(".saveBtn").on("click", function () {

    var time = $(this).parent().attr("id");
    var task = $(this).siblings(".description").val();
    
    // dynamically assign key:value pairs
    scheduleObj[time] = task;

    localStorage.setItem("event", JSON.stringify(scheduleObj));
});

function loadEvents() {

    scheduleObj = JSON.parse(localStorage.getItem("event")) || {};

    for (var time in scheduleObj) {
        var hourId = document.getElementById(time);
        //var hourId = $("#" + time);
        hourId.querySelector(".description").textContent = scheduleObj[time];
    }
}

// color code time blocks every 15 minutes
setInterval(function () {
    colorCode();
  }, (60000 * 15));

// check hours when page loads
colorCode();
// load saved task events
loadEvents();