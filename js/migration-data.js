let p1 = "The Met's rich ownership and exhibition information is stored as paragraphs and lists on the museum's webpage and API...";
let p2 = "...which I pulled down and parsed to extract the location, time, and detail of each location change using Python...";
let p3 = "...and combined ownership and exhibitions to generate clean JSON files that would feed into my visualization";

let animationTime = 500;
let waitTime = 3000;

if($(window).width() >= 800){
  dataProcessOpacity()
} else {
  dataProcessDisplay()
}


function dataProcessOpacity() {
  $('.process-imgs').children('img').css("opacity","0");
  $('.process-imgs').css("display","inline-block");

  $("#data-process-text").children("p").text(p1);
  $('#prov-text-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
    setTimeout(function() {
      $("#data-process-text").children("p").text(p2);
      $('#python-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
        setTimeout(function() {
          $("#data-process-text").children("p").text(p3);
            $('#json-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
                setTimeout(function(){ dataProcessOpacity(); }, waitTime);
              });
        },waitTime);
      });
    },waitTime);
    });
}

function dataProcessDisplay() {
  // $('.process-imgs').children('img').css("opacity","0");
  // $('.process-imgs').css("display","inline-block");
  // $('.process-imgs').css("position","absolute");
  //
  // $("#data-process-text").children("p").text(p1);
  // $('#prov-text-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
  //   setTimeout(function() {
  //     $("#data-process-text").children("p").text(p2);
  //     $('#python-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
  //       setTimeout(function() {
  //         $("#data-process-text").children("p").text(p3);
  //           $('#json-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
  //               setTimeout(function(){ dataProcessOpacity(); }, waitTime);
  //             });
  //       },waitTime);
  //     });
  //   },waitTime);
  //   });

  $('.process-imgs').children('img').css("opacity","1");
  $('.process-imgs').css("display","none");

  $("#data-process-text").children("p").text(p1);
  $('#prov-text-ex-img').css("display","inline-block");
  $('#prov-text-ex-img').children('img').animate({opacity: 1}, animationTime, function() {

    setTimeout(function() {
      $("#data-process-text").children("p").text(p2);
      $('.process-imgs').css("display","none");
      $('#python-ex-img').css("display","inline-block");
      $('#python-ex-img').children('img').animate({opacity: 1}, animationTime, function() {

          setTimeout(function() {
            $("#data-process-text").children("p").text(p3);
            $('.process-imgs').css("display","none");
            $('#json-ex-img').css("display","inline-block");
            $('#json-ex-img').children('img').animate({opacity: 1}, animationTime, function() {
                setTimeout(function(){ dataProcessDisplay(); }, waitTime);
              });
          },waitTime);
        });
    },waitTime);
  });
}
