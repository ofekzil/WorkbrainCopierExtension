

chrome.tabs.onUpdated.addListener((tabID,tab) => {

    chrome.tabs.query({ active: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabID },
            files: ["copyCalendar.js"],
        });
        console.log("finished execute script")
      });

        
    }); 

