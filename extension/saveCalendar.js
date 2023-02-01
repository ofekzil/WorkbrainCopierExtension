// script to download schedule information as a .json file to the computer

// sets the schedule to proper JSON format
function setSchedule() {
  var schedule = {
    "Month" : "",
    "Year" : "",
    "Days" : [],
  
  };
  
  // monthYear is of the form "Month Year" (w/ the space)
  let monthYear = document.getElementsByClassName("pageTitle")[0].innerText;
  const separated = monthYear.split(/\s+/);
  schedule["Month"] = separated[0];
  schedule["Year"] = separated[1];

  //strings in workDaysInfo are of the form "Day Start_Time - End_Time\n(Job, Department)\nmore..."
  let workDaysInfo = document.getElementsByClassName("calendarCellRegularFuture"); 
  for (let i = 0; i < workDaysInfo.length; i += 2) {
    let curr = workDaysInfo[i].innerText;
    curr = curr.replace("more...", "").replace("-", "").replace(/,/g, "").replace("(","").replace(")","");
    const parts = curr.split(/\s+/);
    schedule["Days"].push(setDay(parts));
  }
  
  return schedule;
}

// returns a JSON representation of a day entry
function setDay(dayInfo) {
  var day = {
    "Date": dayInfo[0],
    "Start_Time": dayInfo[1],
    "End_Time": dayInfo[2],
    "Job": dayInfo[3],
    "Department": dayInfo[4]
  }

  return day;
}

// writes the complete schedule to file
function writeToFile(obj) {
  const data = JSON.stringify(obj);
  download("schedule.json",data);
}

// downloads the schedule from the internet
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


writeToFile(setSchedule());

