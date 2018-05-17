showDataProcess();

function showDataProcess() {
  $('.process-imgs').children('img').css("opacity","0");

  $("#data-process-text").children("p").text("The Met's rich ownership and exhibition information is published as paragraphs and lists on the museum webpage");
  $('#prov-text-ex-img').children('img').animate({opacity: 1}, 6000, function() {
    $("#data-process-text").children("p").text("I used python to extract the time and place of each location change for both ownership changes and exhibitions");
      $('#python-ex-img').children('img').animate({opacity: 1}, 6000, function() {
        $("#data-process-text").children("p").text("Then combined ownership and exhibition locations to generate clean JSON files that would feed into my front-end");
          $('#json-ex-img').children('img').animate({opacity: 1}, 6000, function() {
              setTimeout(function(){ showDataProcess(); }, 6000);
            });
        });
    });
}
