(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type, url} = obj;

        if (type === "SCHED") {
            console.log(url);
        }
    });
})();