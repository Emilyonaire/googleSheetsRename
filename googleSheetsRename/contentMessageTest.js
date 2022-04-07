console.log("hello content scripts!");
console.log(window.document.title);
console.log(window.location.suffix)

window.onload = init();

function init() {
    console.log("window loaded")   
    try{
        //add listeners for changing page on sheet without changing main sheet (sheet1,page1 to sheet1,page2 NOT sheet1,page1 to sheet2,page1)
        //sheet1
        //┣-page1
        //┣-page2
        //┗-page3
        //sheet2
        //┣-page1
        //┣-page2
        //┗-page3

        //add listener to prock when user switches to targeted tab
        chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse){
            
            console.log("onMessage Procked")
            if (msg.action == 'prock-tab_now_active') {
                console.log("Message recieved! tab activation now procked");

                generatePagetitle()
            }
            else if (msg.action == 'prock-tab_url_changed') {
                // console.log("Message recieved!");
                // console.log("tab url change recognized and content script has been notified")

                //generation of title stopped as this caused recursive procking of func
                generatePagetitle() 
            }
            else{
                alert("message NOT revieved... will this make a bad thing happen? maybe")
            }
        });
    } catch (error) {
        console.error(error)
        alert("Error: " + error)
    }
}
  



function generateTitleString(prefix, page, sheet, suffix){
    if(prefix != ""){
        prefix = prefix + " - "
    }
    return prefix + page + " - " + sheet + " - " + suffix
}

function generatePagetitle(){
    try{
        var parentDOM = window.document
        var pageTargetClass = "goog-inline-block docs-sheet-tab docs-material docs-sheet-active-tab";
        var sheetTargetClass = "docs-title-input";
        
        // get title of page selected on spreadsheet
        var pageTargetList = parentDOM.getElementsByClassName(pageTargetClass); // a list of matching elements, *not* the element itself
        // console.log(pageTargetList); //HTMLCollection[1]
        var pageTitle = pageTargetList[0].firstChild.firstChild.firstChild.innerText
        
        //get title of spreadsheet
        var sheetTargetList = parentDOM.getElementsByClassName(sheetTargetClass);
        console.log(sheetTargetList)
        var sheetTitle = sheetTargetList[0].value
        
        //set page title
        window.document.title = generateTitleString("",pageTitle,sheetTitle,"Google Sheets")
    } catch (error) {
        console.error(error)
        alert("Error: " + error)
    }
}