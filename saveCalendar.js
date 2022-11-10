

chrome.tabs.onUpdated.addListener((tabID,tab) => {
  if (tab.url && tab.url.includes("workbrain.cineplex.com/etm/time/timesheet/etmTnsMonth")) {
    chrome.tabs.query({ active: true }, function (tabs) {
      chrome.scripting.executeScript({
          target: { tabId: tabID },
          files: ["copyCalendar.js"],
      });
      console.log("finished execute script")
    });

  }
    
        
    }); 

