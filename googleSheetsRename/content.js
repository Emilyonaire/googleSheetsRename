console.log("hello content scripts!");
console.log(window.document.title);

window.onload = init();

function init() {

    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        
        if (msg.action == 'tab_now_active') {
            alert("Message recieved!");
        }
    });
}
  








function gogogadgetPageTitle(){

    var parentDOM = window.document
    var classTarget = "goog-inline-block docs-sheet-tab docs-material docs-sheet-active-tab";
    
    
    var test = parentDOM.getElementsByClassName(classTarget); // a list of matching elements, *not* the element itself
    console.log(test); //HTMLCollection[1]
    
    // console.log(test[0].innerText);
}