javascript:(function(){var regions=[],selectRegions=[],entryName="Arkansas",timeoutWait=100,timeSheetPage="capspire.mavenlink.com/timesheets";function LoadRegions(){TimeSheetPage()?($.each($(".edit-region"),function(e,t){var n=$(t);""!=n.children("input").first().val()&&regions.push(n)}),console.log(regions.length),regions.length>0&&null!=(entryName=entryName.length>0?entryName:prompt("Please enter your default location.",""))&&entryName.length>0&&(EditOpen()?ClickSave():OpenInputForRegion())):alert("This script only runs on: "+timeSheetPage)}function OpenInputForRegion(){if(regions.length>0){var e=$(regions.shift());e.children("input").first().val();e.children(".edit-box-link").first().click(),WaitFor(EditOpen,SetSelectRegionItems)}else console.log("finished")}function SetSelectRegionItems(){selectRegions=[],$.each($(".edit-box").first().find(".location-select-region"),function(e,t){selectRegions.push($(t))}),WaitFor(null,OpenSelect)}function OpenSelect(){if(selectRegions.length>0){var e=$(selectRegions.shift());e.find(".selectize-input").first().click(),WaitFor(DropdownContentOpen,function(){ClickEntry(e)})}else WaitFor(null,ClickSave)}function ClickEntry(e){var t=!0;if($(e).find("#edit-box-location-select").first().val().toLowerCase()!=entryName.toLowerCase()){var n=$(e).find(".selectize-dropdown-content").first().find("[data-value]").filter(function(){return $(this).attr("data-value").toLowerCase()==entryName.toLowerCase()}).first();n.length>0?n.click():(alert("Cound not find location equal to: "+entryName),t=!1)}t&&WaitFor(null,OpenSelect)}function ClickSave(){$(".save-link").click(),WaitFor(EditClosed,OpenInputForRegion)}function WaitFor(e,t){setTimeout(function(){null==e||1==e()?setTimeout(function(){t()},timeoutWait):(console.log("waiting on "+t.name),setTimeout(function(){WaitFor(e,t)},timeoutWait))})}function EditOpen(){return 0!=$(".edit-box").first().length}function EditClosed(){return!EditOpen()}function DropdownContentOpen(){return $(".edit-box").find(".selectize-dropdown-content").first().length>0}function TimeSheetPage(){return window.location.href.includes(timeSheetPage)}LoadRegions();})();
