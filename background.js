

// listener that invokes script when the tghe tab enters workbrain month-view mode 
chrome.tabs.onUpdated.addListener((tabID,tab) => {
  document.getElementById("run script").addEventListener('click', () => {

  
  if (tab.url && tab.url.includes("workbrain.cineplex.com/etm/time/timesheet/etmTnsMonth")) {
    console.log(tab.url);
    chrome.tabs.query({ active: true }, function (tabs) {
      chrome.scripting.executeScript({
          target: { tabId: tabID },
          files: ["saveCalendar.js"],
      });
      console.log("finished execute script")
    });

  } else {
    alert("You must be in workbrain month mode to operate extension")
  }
})
  
        
}); 