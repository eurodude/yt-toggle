// for ichon change toggle
let isOn = false;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // rewrite URL automatically to subscription page BEFORE YouTube is loaded
    if (changeInfo.status === "loading" && tab.url) {
        if (tab.url.endsWith("youtube.com") || tab.url.endsWith("youtube.com/")) {
            // url redirect automatically to the subscription page of YouTube
            let newUrl = tab.url + "/feed/subscriptions"; 
            chrome.tabs.update(tabId, { url: newUrl });
        }
    }
});


chrome.action.onClicked.addListener((tab) => {
    isOn = !isOn;

    // Chose the right icon for on or off!
    const iconPaths = isOn ? {16: "icons/YT-Toggle-on-16.png", 48: "icons/YT-Toggle-on-48.png", 128: "icons/YT-Toggle-on-128.png"} : {16: "icons/YT-Toggle-off-16.png", 48: "icons/YT-Toggle-off-48.png", 128: "icons/YT-Toggle-off-128.png"};
    // Update the icon for this tab 
    chrome.action.setIcon({ path: iconPaths, tabId: tab.id });

    // when clicked, description, comments and suggestions should be toggled hidden or shown
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            const el = document.getElementById("columns");
            if (el) {
                // YouTube uses FLEX: so display can either be flex or none!
                el.style.display = (el.style.display === "none") ? "flex" : "none";
            }
        }
    });
});
