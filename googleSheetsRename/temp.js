let lastUrl = '';

chrome.runtime.onInstalled.addListener(() => {
    // chrome.storage.sync.set({ colour });

    
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs[0]);
    });
    
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    getTabInfo(activeTabId = activeInfo.tabId);
    // console.log(tab.title);
});

function getTabInfo(tabId) {
    chrome.tabs.get(tabId, function(tab) {
    if(lastUrl != tab.url || lastTitle != tab.title)
        console.log(lastUrl = tab.url, lastTitle = tab.title);
        
        queryTabURL(tab);
        // return tab;
        
    });
}

function queryTabURL(tab){
    if(tab.url.startsWith("https://docs.google.com/spreadsheets/d")){
        console.log('user is now in google sheets tab');
        // var oldTabTitle = tab.title;

        
        // chrome.tabs.sendMessage(tab.tabId, {action: "tab_now_active"});
        chrome.tabs.sendMessage(tab.tabId, {action: "open_dialog_box"}, function(response) {});  

        // chrome.windows.get(tab.windowId, function(win){ 
        //     console.log(win); // THIS IS THE WINDOW OBJECT
        //     console.log(win);
        // });
      
    }
}