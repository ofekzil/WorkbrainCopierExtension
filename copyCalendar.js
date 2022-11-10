var schedule = {
  "Month" : "",
  "Year" : "",
  "Days" : [],

};

function setSchedule() {
  let monthYear = document.getElementsByClassName("pageTitle")[0].innerText;
  let workDaysInfo = document.getElementsByClassName("calendarCellRegularFuture"); //use innerTest to access strings of the format 10\t17:00 - 23:00\n(CONCESSION, 11149)\nmore. here

}



for (let i = 0; i < workDaysInfo.length; i++) {
  let curr = workDaysInfo[i].innerText;

  console.log(curr);
}


console.log("finished in copy")
