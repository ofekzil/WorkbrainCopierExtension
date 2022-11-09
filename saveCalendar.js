

    chrome.tabs.onUpdated.addListener((tabID,tab) => {
        console.log(tab.url);
        if (tab.url && tab.url.includes("workbrain.cineplex.com")) {
            
            const urlParams = new URLSearchParams(tab.url);
            console.log(urlParams);

            chrome.tabs.sendMessage(tabID, {
                type: "SCHED",
                id: urlParams,
            });
        }
    });