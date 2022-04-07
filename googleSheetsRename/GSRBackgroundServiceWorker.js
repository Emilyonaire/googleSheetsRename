let lastUrl = '';
let lastTitle = '';


try{
    //listen for extension install
    chrome.runtime.onInstalled.addListener(() => {
        // chrome.storage.sync.set({ colour });
        // console.log("installed")
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            console.log(tabs[0]); //print currently active tab (9 times out of 10 this is the extension manager page in chrome, just here to verify the extension installed ok and the bgsw ran ok)
        });
        
    });


    //listen for tab url change
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if(changeInfo.status === 'complete'){
            // read changeInfo data and do something with it (like read the url)

            // console.log("url change")
            // alert(tab.url) // DO NOT ENABLE, LOOPS ALERTS
            if(tab.url != lastUrl){
                console.log("url change procked for the first time")
                queryTabURL(tab, "urlChange")
                lastUrl = tab.url
            } else{

                // console.log("repeated url changes procked and blocked")
            }
        }
    });


    //listen for tab switch
    chrome.tabs.onActivated.addListener(function(activeInfo) {
        console.log("tab change")
        getTabInfo(activeTabId = activeInfo.tabId, "tabChange");
    });


} catch (error) {
    console.error(error)
    alert("Error: " + error)
}

function getTabInfo(tabId, cause) {
    try{
        chrome.tabs.get(tabId, function(tab) {
            if(lastUrl != tab.url || lastTitle != tab.title)
            console.log(lastUrl = tab.url, lastTitle = tab.title);
            
            queryTabURL(tab, cause);
        });
    } catch (error) {
        console.error(error)
        alert("Error: " + error)
    }
}

function queryTabURL(tab,cause){
    
    try{
        if(tab.url.startsWith("https://docs.google.com/spreadsheets/d")){            
            if(cause == "tabChange"){
                console.log('user is now in targettet tab');
                // var oldTabTitle = tab.title;
                
                chrome.tabs.sendMessage(tab.id, {action: "prock-tab_now_active"}, function(response) {});
            }
            else if(cause == "urlChange"){
                console.log('user is now in targettet tab');
                // var oldTabTitle = tab.title;
                
                chrome.tabs.sendMessage(tab.id, {action: "prock-tab_url_changed"}, function(response) {});
            }
        }
    } catch (error) {
        console.error(error)
        alert("Error: " + error)
    }
}