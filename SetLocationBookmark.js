javascript:(function(){var regions=[],entryName="",timeoutWait=100,timeSheetPage="capspire.mavenlink.com/timesheets";function LoadRegions(){TimeSheetPage()?($.each($(".edit-region"),function(e,t){var n=$(t);""!=n.children("input").first().val()&&regions.push(n)}),console.log(regions.length),regions.length>0&&null!=(entryName=prompt("Please enter your default location.",""))&&entryName.length>0&&(EditOpen()?ClickSave():OpenInputForRegion())):alert("This script only runs on: "+timeSheetPage)}function OpenInputForRegion(){if(regions.length>0){var e=$(regions.shift());e.children("input").first().val();e.children(".edit-box-link").first().click(),WaitFor(EditOpen,OpenSelect)}else console.log("finished")}function OpenSelect(){$(".edit-box").first().find(".location-select-region").first().find(".selectize-input").first().click(),WaitFor(DropdownContentOpen,ClickEntry)}function ClickEntry(){var e=!0,t=$(".edit-box").first().find(".location-select-region");$.each(t,function(t,n){if($(n).find("#edit-box-location-select").first().val().toLowerCase()!=entryName.toLowerCase()){var i=$(n).find(".selectize-dropdown-content").first().find("[data-value]").filter(function(){return $(this).attr("data-value").toLowerCase()==entryName.toLowerCase()}).first();if(!(i.length>0))return alert("Cound not find location equal to: "+entryName),e=!1,!1;i.click()}}),e&&WaitFor(null,ClickSave)}function ClickSave(){$(".save-link").click(),WaitFor(EditClosed,OpenInputForRegion)}function WaitFor(e,t){setTimeout(function(){null==e||1==e()?setTimeout(function(){t()},timeoutWait):(console.log("waiting on "+t.name),setTimeout(function(){WaitFor(e,t)},timeoutWait))})}function EditOpen(){return 0!=$(".edit-box").first().length}function EditClosed(){return!EditOpen()}function DropdownContentOpen(){return $(".edit-box").find(".selectize-dropdown-content").first().length>0}function TimeSheetPage(){return window.location.href.includes(timeSheetPage)}LoadRegions();})();
