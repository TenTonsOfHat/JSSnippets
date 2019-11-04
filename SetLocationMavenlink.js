
var regions = [];  
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
        var input = region.children('input:enabled').first().val(); 
        if (input != null && input != "") {
            regions.push(region)
        }
    }) 
    console.log(regions.length)
    if(EditOpen()){
        ClickSave();
    }else {
        OpenInputForRegion();
    }
    
} 


function OpenInputForRegion(){
    if(regions.length > 0){
        var region = $(regions.shift());
        var input = region.children('input').first().val(); 
        var pencil = region.children(".edit-box-link").first();
        pencil.click();
        WaitFor(EditOpen, OpenSelect)
    }else {
        console.log("finished")
    }
} 

function OpenSelect(){
    var locationSelect = $('.edit-box').first().find(".location-select-region").first();
    locationSelect.find('.selectize-input').first().click()
    WaitFor(DropdownContentOpen, ClickEntry)
} 

function ClickEntry() {
    var locationSelect = $('.edit-box').first().find(".location-select-region");
    $.each(locationSelect, function(i,v){
            var dropdownContent = $(v).find('.selectize-dropdown-content').first().find("[data-value='"+entryName+"']").first() 
            dropdownContent.click();
    })

    WaitFor(null, ClickSave);
    
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

   
