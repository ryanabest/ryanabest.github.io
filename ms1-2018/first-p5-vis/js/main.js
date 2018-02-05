var metObjects;
var metImages;

// metObjects = 'test';

function preload() {
  metObjects = loadTable('assets/MetObjects5000.csv','csv','header');
  // metImages = loadTable('assets/MMAImageURLS.csv','csv','header');
}

function setup() {
  noCanvas();
  printLinks();
}

function printLinks() {
  let metObjectsR = metObjects.getRowCount();
  // let metImagesR = metImages.getRowCount();

  for (let r=0;r<metObjectsR;r++) {
    let objectID = metObjects.get(r,3);
    let objectName = metObjects.get(r,6);
    let objectURL = metObjects.get(r,40);
    let isArtist;
    if (metObjects.get(r,14) === '') {
      isArtist = 'noArtist';
    } else {
      isArtist = 'artist';
    }
    let link = createA(objectURL,objectName,'_blank');
    link.class(isArtist);
    createSpan(' | ');
  }
}
