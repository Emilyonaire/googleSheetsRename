window.onload = init;


// var togglerOn = false;


function init(){   

    mute()
    setTimeout(function() {//do function after x microseconds
        unmute();
    }, 200);
    //im having to use chrome storage local to save whether the options have been saved or not, this is a god awful solution
    chrome.storage.sync.set({optionsSaved: true}, confirmSaved);
    // chrome.storage.sync.set({togglerOn: false}, confirmSaved);
    chrome.storage.sync.get(['optionsSaved'], function(obj){
        console.log(obj.optionsSaved);
        
        var saved = false;
        const apiKeyInput = document.getElementById('inp_apiKey');
        const mapHeightInput = document.getElementById('inp_mapHeight');
        const mapWidthInput = document.getElementById('inp_mapWidth');
        const popupHeightInput = document.getElementById('inp_popupHeight');
        const popupWidthInput = document.getElementById('inp_popupWidth');
        const autoCloseToggle = document.getElementById('chk_autoClose');
        console.log("document.body.innerHTML: " + document.body.innerHTML);
        // const saveButton = document.getElementById('btn_save');
        
        const saveButton = document.getElementById('btn_save');
        console.log(saveButton);
        saveButton.addEventListener('click',save_options);

        const testButton = document.getElementById('btn_test');
        console.log(testButton);
        testButton.addEventListener('click',launch_test_map);
        
        apiKeyInput.addEventListener('change', markUnsaved, saved);
        mapHeightInput.addEventListener('change', markUnsaved, saved);
        mapWidthInput.addEventListener('change', markUnsaved, saved);
        // popupHeightInput.addEventListener('change', markUnsaved, saved);
        // popupWidthInput.addEventListener('change', markUnsaved, saved);

        autoCloseToggle.addEventListener('click', toggleButtonHelper);

        // togglerOn = obj.autoClose;
    })
}

// Saves options to chrome.storage
function save_options() {
    console.log("save_options function called");
    const apiKeyInput = document.getElementById('inp_apiKey');
    const mapHeightInput = document.getElementById('inp_mapHeight');
    const mapWidthInput = document.getElementById('inp_mapWidth');
    // const popupHeightInput = document.getElementById('inp_popupHeight');
    // const popupWidthInput = document.getElementById('inp_popupWidth');
    const autoCloseToggle = document.getElementById('chk_autoClose');
    const zoomLevelInput = document.getElementById('inp_zoomLevel');
    var apiKey = apiKeyInput.value;
    var autoClose = autoCloseToggle.checked;
    var mapHeight = mapHeightInput.value;
    var mapWidth = mapWidthInput.value;
    // var popupHeight = popupHeightInput.value;
    // var popupWidth = popupWidthInput.value;
    var zoomLevel = zoomLevelInput.value;
    

    chrome.storage.sync.get(['optionsSaved'], function(obj){
        var localsaved = obj.optionsSaved;
        // - only save an option if it has been changed - will need to update this when i add in loading the currently saved options
        if(apiKey != ""){
            chrome.storage.sync.set({apiKey: apiKey}, confirmSaved(localsaved));
        }
        //autoClose will always update
        chrome.storage.sync.set({autoClose: autoClose}, confirmSaved(localsaved));
        
        if(mapHeight != ""){
            chrome.storage.sync.set({mapHeight: mapHeight}, confirmSaved(localsaved));
            chrome.storage.sync.set({popupHeight: parseInt(mapHeight)+50}, confirmSaved(localsaved));
        }
        if(mapWidth != ""){
            chrome.storage.sync.set({mapWidth: mapWidth}, confirmSaved(localsaved));
            chrome.storage.sync.set({popupWidth: parseInt(mapWidth)+5}, confirmSaved(localsaved));
        }
        // if(popupHeight != ""){
        //     chrome.storage.sync.set({popupHeight: popupHeight}, confirmSaved(localsaved));
        // }
        // if(popupWidth != ""){
        //     chrome.storage.sync.set({popupWidth: popupWidth}, confirmSaved(localsaved));
        // }
        if(zoomLevel != ""){
            chrome.storage.sync.set({zoomLevel: zoomLevel}, confirmSaved(localsaved));
        }
    });

    const saveButton = document.getElementById('btn_save');

    // saveButton.onclick = save_options(); // change to addEventListener
    saveButton.addEventListener('click', save_options);
}

function confirmSaved(saved){
    console.log('start confirm save');
    chrome.storage.sync.set({optionsSaved: true}, function(){console.log("marked saved.");});
    // Update status to let user know options were saved.
    // console.log("marked saved");
    if(saved == false){

        var status = document.getElementById('muterBAR');
        status.setAttribute("class", "center textCenter bg5round popbar popbarSavedIn")
        setTimeout(function() {//do function after x microseconds
            status.textContent = 'Options saved.';
            status.setAttribute("class", "center textCenter bg5round popbar popbarSavedOut")
            // status.innerHTML = '&#8203;';
            setTimeout(function() {//do function after x microseconds
                status.setAttribute("class", "center textCenter bg5round popbar popbarHold")
                setTimeout(function() {//do function after x microseconds
                    status.innerHTML = '&#8203;';
                }, 1000);
            }, 2000);
        }, 1000);
        console.log('-');
        console.log(status);
        console.log('end confirm, save');
    }
}    

function toggleButtonHelper(){
    markUnsaved();
    toggleButton();
}

function toggleButton(){
    const autoCloseToggle = document.getElementById('chk_autoClose');
    chrome.storage.sync.get(['togglerOn'], function(obj){
        console.log("start of toggleButton()");
        if(obj.togglerOn == true){
            console.log("toggler lists true");
            autoCloseToggle.setAttribute("class", "Auto-CloseB right inputBox"); //set autoclose toggle to darker "B" variant
            chrome.storage.sync.set({togglerOn: false}, function(){console.log("set toggler to false");});
            // obj.togglerOn = false;
        }
        else if(obj.togglerOn == false){
            console.log("toggler lists false");
            autoCloseToggle.setAttribute("class", "Auto-CloseA right inputBox"); //set autoclose toggle to lighter "A" variant
            chrome.storage.sync.set({togglerOn: true}, function(){console.log("set toggler to true");});
            // obj.togglerOn = false;
        }
        console.log("end of toggleButton()");
    });
}

function markUnsaved(){
    console.log('start mark unsaved');
    chrome.storage.sync.get(['optionsSaved'], function(obj){
        console.log(obj.optionsSaved);
        console.log("option changed!");
        var status = document.getElementById('muterBAR');
        if(obj.optionsSaved == false){
            //do nothing, already marked
            // console.log("options already marked as popbarUnsavedIn");
        }else if(obj.optionsSaved == true){
            console.log('mark unsaved');
            console.log(status);
            
            status.setAttribute("class", "center textCenter bg5round popbar popbarUnsavedIn")
            console.log("just set to popbarUnsavedIn");
            status.textContent = 'Be Careful! Unsaved Options!';
            setTimeout(function() {//do function after x microseconds
                status.setAttribute("class", "center textCenter bg5round popbar popbarUnsavedHold")
                console.log("just set to popbarUnsavedHold");
                // status.textContent = 'Be Careful! Unsaved Options!';
                // status.innerHTML = '&#8203;';
                
            }, 1000);
            console.log("marked as unsaved");
        }
        console.log('-');
        console.log(status);
    })
    chrome.storage.sync.set({optionsSaved: false}, function(){console.log("marked unsaved.");});
    console.log('end mark unsaved');
}


function mute(){
    var status = document.getElementById('muter');
    console.log(status);
    status.setAttribute("visibility", "hidden")
    console.log("popbar muted");

}

function unmute(){
    var status = document.getElementById('muter');
    console.log(status);
    status.setAttribute("visibility", "visible")
    console.log("popbar unmuted")

}

function launch_test_map(){
    const apiKey = "AIzaSyD33d1Sc-jxsHCSG2z_lp_k4hfexiCXRRE"; // unused in this script, not passed to other scripts, here only for clarity
    const mapWidth = 410;
    const mapHeight = 310;
    const zoomLevel = 1;
    // const popupWidth = 450;
    // const popupHeight = 375;
    

    chrome.storage.sync.get(['apiKey','popupWidth','popupHeight'], function(obj) {
        console.log("passed all good: api key is "+obj.apiKey)
        // console.log(data);
        var keyParam = "apiKey="+obj.apiKey

        var extraParams = "&"+"mapWidth="+mapWidth+"&"+"mapHeight="+mapHeight+"&"+"zoomLevel="+zoomLevel;
        
        var tempX = obj.popupWidth
        console.log("tempX = " + tempX);
        var tempY = obj.popupHeight
        console.log("tempY = " + tempY);

        // console.log("creating popup window with url: " + chrome.runtime.getURL("map/map.html?selection="+info.selectionText+"&"+extraparams));
        chrome.windows.create({
            url: chrome.runtime.getURL("map/map.html?selection="+"SW1A 1AA"+"&"+keyParam),
            type: "popup",
            height: tempX, width: tempY
        });
    })
}


// // Restores select box and checkbox state using the preferences
// // stored in chrome.storage.
// function restore_options() {
//   // Use default value color = 'red' and likesColor = true.
//   chrome.storage.sync.get({
//     favoriteColor: 'red',
//     likesColor: true
//   }, function(items) {
//     document.getElementById('color').value = items.favoriteColor;
//     document.getElementById('like').checked = items.likesColor;
//   });
// }
// document.addEventListener('DOMContentLoaded', restore_options);