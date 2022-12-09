const defaultKey = "validation";

const executeScriptFunction = async (tabID) => {
    try {
        await chrome.scripting.executeScript({
            target: { tabId: tabID },
            files: ['app.js']
        });
    } catch (error) {
        const localStoreName = `${defaultKey}${tabID}`;
        chrome.action.setBadgeText({ tabId: tabID, text: 'OFF' });
        chrome.storage.local.set({ [localStoreName]: "close" });
    }
}

const onClickAction = (tabID) => {
    const localStoreName = `${defaultKey}${tabID}`;

    chrome.storage.local.get([localStoreName], (result) => {

        if (result[localStoreName]) {
            if (result[localStoreName] == "open") {
                chrome.storage.local.set({ [localStoreName]: "close" });
                chrome.tabs.reload(tabID);
            } else {
                chrome.action.setBadgeText({ tabId: tabID, text: 'ON' });
                chrome.storage.local.set({ [localStoreName]: "open" });
                executeScriptFunction(tabID);
            }
        } else {
            chrome.storage.local.set({ [localStoreName]: "open" });
            chrome.tabs.reload(tabID);
            console.log("localstore empty");
        }

    });

}

const onViewAction = (tabID) => {
    const localStoreName = `${defaultKey}${tabID}`;

    chrome.storage.local.get([localStoreName], (result) => {
        const localStoreName = `${defaultKey}${tabID}`;

        if (result[localStoreName]) {
            if (result[localStoreName] == "open") {
                chrome.action.setBadgeText({ tabId: tabID, text: 'ON' });
                executeScriptFunction(tabID);
            } else {
                chrome.action.setBadgeText({ tabId: tabID, text: 'OFF' });
            }
        } else {
            chrome.storage.local.set({ [localStoreName]: "open" });
            chrome.tabs.reload(tabID);
            console.log("localstore empty");
        }

    });
}

chrome.action.onClicked.addListener((tab) => {
    onClickAction(tab.id);
});

chrome.tabs.onUpdated.addListener(async (tabID, changeInfo, tab) => {
    if (changeInfo.status == 'complete' && tab.active) {
        onViewAction(tabID);
    }
});
