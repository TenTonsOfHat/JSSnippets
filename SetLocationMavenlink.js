
var regions = [], selectRegions = [];  
var entryName = "Arkansas"
var timeoutWait = 100;
var timeSheetPage = "capspire.mavenlink.com/timesheets"


function LoadRegions(){
    if(!TimeSheetPage()){
        alert("This script only runs on: "+timeSheetPage); 
        return;
    }
    $.each($(".edit-region"), function(i,v) {
        var region = $(v);
        var input = region.children('input').first().val(); 
        if (input != "") {
            regions.push(region)
        }
    }) 


    console.log(regions.length)

    if(regions.length > 0){
        entryName = entryName.length > 0 ? entryName : prompt("Please enter your default location.", ""); 
        if(entryName != null && entryName.length > 0){
            if(EditOpen()){
                ClickSave();
            }else {
                OpenInputForRegion();
            } 
        }

    }

    
} 


function OpenInputForRegion(){
    if(regions.length > 0){
        var region = $(regions.shift());
        var input = region.children('input').first().val(); 
        var pencil = region.children(".edit-box-link").first();
        pencil.click();
        WaitFor(EditOpen, SetSelectRegionItems)
    }else {
        console.log("finished")
    }
} 

function SetSelectRegionItems(){
    selectRegions = []; 
    $.each($('.edit-box').first().find(".location-select-region"), function (i,v){selectRegions.push($(v))})
    WaitFor(null, OpenSelect)
}


function OpenSelect(){

    if(selectRegions.length > 0){
        var selectRegion = $(selectRegions.shift());
        selectRegion.find('.selectize-input').first().click()
        WaitFor(DropdownContentOpen, function(){ClickEntry(selectRegion)})
    }else {
         WaitFor(null, ClickSave);
    }

} 



function ClickEntry(locationSelect) {
    var foundLocation = true;
    var currentValue = $(locationSelect).find('#edit-box-location-select').first().val(); 
    if(currentValue.toLowerCase() != entryName.toLowerCase()){
       var dropdownContent = $(locationSelect)
        .find('.selectize-dropdown-content').first()
        .find("[data-value]").filter(function(){return $(this).attr('data-value').toLowerCase() == entryName.toLowerCase();})
        .first();

        if(dropdownContent.length >0){
            dropdownContent.click();
        }else {
            alert("Cound not find location equal to: " + entryName)
            foundLocation = false;
        }

    }

    if(foundLocation){
        WaitFor(null, OpenSelect);
    }
    
    
}  

function ClickSave(){
    $(".save-link").click()
    WaitFor(EditClosed, OpenInputForRegion)
} 


function WaitFor(waitCheck, nextAction){
    setTimeout(function(){
        if(waitCheck == null || waitCheck() == true){
            setTimeout(function(){nextAction()}, timeoutWait)
        }else {
            console.log("waiting on "+ nextAction.name) 
            setTimeout(function(){WaitFor(waitCheck, nextAction)}, timeoutWait)
        }
    })
} 


function EditOpen(){return $('.edit-box').first().length != 0}
function EditClosed(){return !EditOpen()}
function DropdownContentOpen(){return $(".edit-box").find('.selectize-dropdown-content').first().length > 0} 
function TimeSheetPage(){return window.location.href.includes(timeSheetPage)}


LoadRegions();

   
