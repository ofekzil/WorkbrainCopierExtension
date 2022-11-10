// import { writeFile } from 'fs'; // find how to import file properly

// sets the schedule to proper JSON format
function setSchedule() {
  var schedule = {
    "Month" : "",
    "Year" : "",
    "Days" : [],
  
  };
  // monthYear is of teh form "Month Year" (w/ teh space)
  let monthYear = document.getElementsByClassName("pageTitle")[0].innerText;
  const separated = monthYear.split(/\s+/);
  console.assert(separated.length === 2);
  schedule["Month"] = separated[0];
  schedule["Year"] = separated[1];
  console.log(schedule["Month"]);
  console.log(schedule["Year"]);
  //strings in workDaysInfo are of the form "Day Start_Time - End_Time\n(Job, Department)\nmore..."
  let workDaysInfo = document.getElementsByClassName("calendarCellRegularFuture"); 
  for (let i = 0; i < workDaysInfo.length; i += 2) {
    let curr = workDaysInfo[i].innerText;
    curr = curr.replace("more...", "").replace("-", "").replace(/,/g, "").replace("(","").replace(")","");
    console.log(curr);
    const parts = curr.split(/\s+/);
    console.log(parts.length);
    //console.assert(parts.length === 5);
    schedule["Days"].push(setDay(parts));
  }
  console.log(schedule["Days"]); 
  
  writeToFile(schedule);
}

// returns a JSON representation of a day enty
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
  const data = JSON.stringify(schedule);
  writeFile("./schedule.json", data, err => {
    if (err) {
      console.log("Error writing file", err)
    } else {
      console.log("successfuly wrote to file");
    }
  })
}

setSchedule();


console.log("finished in copy")
