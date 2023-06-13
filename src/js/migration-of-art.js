export class MigrationOfArt {
  constructor () {
    if (!document.querySelector('#data-process')) return this;

    const p1 = "The Met's rich ownership and exhibition information is stored as paragraphs and lists on the museum's webpage and API...";
    const p2 = '...which I pulled down and parsed to extract the location, time, and detail of each location change using Python...';
    const p3 = '...and combined ownership and exhibitions to generate clean JSON files that would feed into my visualization';

    const animationTime = 20;
    const waitTime = 3500;

    if (window.innerWidth >= 800) {
      dataProcessOpacity();
    } else {
      dataProcessDisplay();
    }

    function dataProcessOpacity () {
      animate();

      function animate () {
        const processImgs = document.getElementsByClassName('process-imgs');
        for (let p = 0; p < processImgs.length; p++) {
          const processImg = processImgs[p];
          const imgs = processImg.getElementsByTagName('img');
          const img = imgs[0];
          img.style.opacity = '0';
          img.style.display = 'inline-block';
        }

        const processText = document.getElementById('data-process-text');
        const processTextPars = processText.getElementsByTagName('p');
        processTextPars[0].innerHTML = p1;

        const provTextEx = document.getElementById('prov-text-ex-img');
        const provTextExImg = provTextEx.getElementsByTagName('img')[0];
        provTextExImg.style.opacity = '1';

        setTimeout(function () {
          document.getElementById('data-process-text').getElementsByTagName('p')[0].innerHTML = p2;
          const pythonId = setInterval(pythonFrame, animationTime);
          let pythonPos = 0;
          const pythonTextEx = document.getElementById('python-ex-img');
          const pythonTextExImg = pythonTextEx.getElementsByTagName('img')[0];

          function pythonFrame () {
            if (pythonPos === animationTime) {
              clearInterval(pythonId);
            } else {
              pythonPos++;
              pythonTextExImg.style.opacity = pythonPos / animationTime;
            }
          }
        }, waitTime);

        setTimeout(function () {
          document.getElementById('data-process-text').getElementsByTagName('p')[0].innerHTML = p3;
          const jsonId = setInterval(jsonFrame, animationTime);
          let jsonPos = 0;
          const jsonTextEx = document.getElementById('json-ex-img');
          const jsonTextExImg = jsonTextEx.getElementsByTagName('img')[0];

          function jsonFrame () {
            if (jsonPos === animationTime) {
              clearInterval(jsonId);
            } else {
              jsonPos++;
              jsonTextExImg.style.opacity = jsonPos / animationTime;
            }
          }
        }, waitTime * 2);

        setTimeout(function () {
          animate();
        }, waitTime * 3);
      }
    }

    function dataProcessDisplay () {
      animate();

      function hideAll () {
        const processImgs = document.getElementsByClassName('process-imgs');
        for (let p = 0; p < processImgs.length; p++) {
          const processImg = processImgs[p];
          const imgs = processImg.getElementsByTagName('img');
          const img = imgs[0];
          img.style.opacity = '1';
          img.style.display = 'none';
        }
      }

      function animate () {
        hideAll();

        const processText = document.getElementById('data-process-text');
        const processTextPars = processText.getElementsByTagName('p');
        processTextPars[0].innerHTML = p1;

        const provTextEx = document.getElementById('prov-text-ex-img');
        const provTextExImg = provTextEx.getElementsByTagName('img')[0];
        provTextExImg.style.display = 'inline-block';

        setTimeout(function () {
          hideAll();
          document.getElementById('data-process-text').getElementsByTagName('p')[0].innerHTML = p2;
          const pythonTextEx = document.getElementById('python-ex-img');
          const pythonTextExImg = pythonTextEx.getElementsByTagName('img')[0];
          pythonTextExImg.style.display = 'inline-block';
        }, waitTime);

        setTimeout(function () {
          hideAll();
          document.getElementById('data-process-text').getElementsByTagName('p')[0].innerHTML = p3;
          const jsonTextEx = document.getElementById('json-ex-img');
          const jsonTextExImg = jsonTextEx.getElementsByTagName('img')[0];
          jsonTextExImg.style.display = 'inline-block';
        }, waitTime * 2);

        setTimeout(function () {
          animate();
        }, waitTime * 3);
      }
    }
  }
}
