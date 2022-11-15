

// listener that invokes script when popup button is pressed in workbrain month mode
// if button is pressed elsewhere, it alerts the user
  document.getElementById("download").addEventListener('click', () => {

    chrome.tabs.query({ active: true }, function (tabs) {
      const url = tabs[0].url;
      if (url && url.includes("workbrain.cineplex.com/etm/time/timesheet/etmTnsMonth")) {

      
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["./extension/saveCalendar.js"],
      });

    //   chrome.scripting.executeScript({
    //     target: { tabId: tabID },
    //     files: ["runPy.js"],
    // });
  } else {
    alert("You must be in workbrain month mode to operate extension")
  }
      console.log("finished execute script")
    });
});