let p1 = "The Met's rich ownership and exhibition information is stored as paragraphs and lists on the museum's webpage and API...";
let p2 = "...which I pulled down and parsed to extract the location, time, and detail of each location change using Python...";
let p3 = "...and combined ownership and exhibitions to generate clean JSON files that would feed into my visualization";

let animationTime = 20;
let waitTime = 3500;

if(window.innerWidth >= 800){
  dataProcessOpacity()
} else {
  dataProcessDisplay()
}


function dataProcessOpacity() {

  animate();

  function animate() {

    let processImgs = document.getElementsByClassName("process-imgs")
    for (let p=0;p<processImgs.length;p++) {
      let processImg = processImgs[p];
      let imgs = processImg.getElementsByTagName("img");
      let img = imgs[0];
      img.style.opacity = "0";
      img.style.display = "inline-block";
    }

    let processText = document.getElementById("data-process-text")
    let processTextPars = processText.getElementsByTagName("p")
    processTextPars[0].innerHTML = p1;

    let provTextEx = document.getElementById("prov-text-ex-img");
    let provTextExImg = provTextEx.getElementsByTagName("img")[0];
    provTextExImg.style.opacity = "1";


    setTimeout(function() {
      document.getElementById("data-process-text").getElementsByTagName("p")[0].innerHTML = p2;
      let pythonId = setInterval(pythonFrame,animationTime);
      let pythonPos = 0;
      let pythonTextEx = document.getElementById("python-ex-img");
      let pythonTextExImg = pythonTextEx.getElementsByTagName("img")[0]

      function pythonFrame() {
        if (pythonPos == animationTime) {
          clearInterval(pythonId);
        } else {
          pythonPos++;
          pythonTextExImg.style.opacity = pythonPos/animationTime;
        }
      }
    },waitTime);

    setTimeout(function() {
      document.getElementById("data-process-text").getElementsByTagName("p")[0].innerHTML = p3;
      let jsonId = setInterval(jsonFrame,animationTime);
      let jsonPos = 0;
      let jsonTextEx = document.getElementById("json-ex-img");
      let jsonTextExImg = jsonTextEx.getElementsByTagName("img")[0]

      function jsonFrame() {
        if (jsonPos == animationTime) {
          clearInterval(jsonId);
        } else {
          jsonPos++;
          jsonTextExImg.style.opacity = jsonPos/animationTime;
        }
      }
    },waitTime*2);

    setTimeout(function() {
      animate()
    },waitTime*3)
  }
}

function dataProcessDisplay() {

  animate();

  function hideAll() {
    let processImgs = document.getElementsByClassName("process-imgs")
    for (let p=0;p<processImgs.length;p++) {
      let processImg = processImgs[p];
      let imgs = processImg.getElementsByTagName("img");
      let img = imgs[0];
      img.style.opacity = "1";
      img.style.display = "none";
    }
  }

  function animate() {

    hideAll()

    let processText = document.getElementById("data-process-text")
    let processTextPars = processText.getElementsByTagName("p")
    processTextPars[0].innerHTML = p1;

    let provTextEx = document.getElementById("prov-text-ex-img");
    let provTextExImg = provTextEx.getElementsByTagName("img")[0];
    provTextExImg.style.display = "inline-block";


    setTimeout(function() {
      hideAll();
      document.getElementById("data-process-text").getElementsByTagName("p")[0].innerHTML = p2;
      let pythonTextEx = document.getElementById("python-ex-img");
      let pythonTextExImg = pythonTextEx.getElementsByTagName("img")[0]
      pythonTextExImg.style.display = "inline-block"
    },waitTime);

    setTimeout(function() {
      hideAll();
      document.getElementById("data-process-text").getElementsByTagName("p")[0].innerHTML = p3;
      let jsonTextEx = document.getElementById("json-ex-img");
      let jsonTextExImg = jsonTextEx.getElementsByTagName("img")[0]
      jsonTextExImg.style.display = "inline-block";
    },waitTime*2);

    setTimeout(function() {
      animate()
    },waitTime*3)
  }
}
