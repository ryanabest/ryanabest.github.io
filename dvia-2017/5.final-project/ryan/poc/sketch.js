var table;

var lngth = window.innerWidth;
var hght = window.innerHeight;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("assets/2012_House_and_Senate_Cleaned.csv", "csv", "header");
}

function setup() {
  background(240);
  createCanvas(lngth*8,hght*3);
  // console.log(table.getRowCount());
  // console.log(table.getRowCount());
  var stList = [];
  for (let r=0;r<table.getRowCount();r++) {
    if ($.inArray(table.getString(r,1),stList) == -1 && table.getString(r,1) != "") {
      stList.push(table.getString(r,1));
    }
  }


  var electionResults = [];

  for (let s=0;s<stList.length;s++) {
    var txt = stList[s] + " - ";
    var distList = [];
    var partyList = [];
    var partyDict = []
    var rows = table.findRows(stList[s],"STATE ABBREVIATION");
    // console.log(rows);
    for (let r=0;r<rows.length;r++) {
      // console.log(rows[r]['arr'][21]);
      // console.log(parseInt(rows[r]['arr'][11].replace(",","")));
      // console.log(isNaN(parseInt(rows[r]['arr'][11].replace(",",""))));
      // console.log(' ');
      if ($.inArray(rows[r]['arr'][3],distList) == -1 && rows[r]['arr'][3] != '' && rows[r]['arr'][3] != 'H' && rows[r]['arr'][3] != 'S') {
        distList.push(rows[r]['arr'][3]);
      }
      if ($.inArray(rows[r]['arr'][10],partyList) == -1) {
        partyList.push(rows[r]['arr'][10]);
      }
    }
    // console.log(partyList);
    for (let d=0;d<distList.length;d++) {
      txt = txt + distList[d] + " ";
      for (let r=0;r<rows.length;r++) {
        if (rows[r]['arr'][3] === distList[d]) {
          txt = txt + rows[r]['arr'][8] +  ' (' + rows[r]['arr'][10] + '): ' + rows[r]['arr'][15] + ' - ' + rows[r]['arr'][16] + ' ';
        }
      }
      txt = txt + ";  "
    }
    text(txt,10,(hght/stList.length)*(s+1));

    for (let p=0;p<partyList.length;p++) {
      partyDict.push({state:stList[s],party:partyList[p],partyVotes:0,totalVotes:0,pctOfVotes:0,partyDists:0,totalDists:0,pctOfDists:0});
    }
    for (let r=0;r<rows.length;r++) {
      for (let p=0;p<partyDict.length;p++) {
        if (isNaN(parseInt(rows[r]['arr'][15].replace(",","")))) {
        } else {
          partyDict[p]['totalDists'] = distList.length;
          partyDict[p]['totalVotes'] = partyDict[p]['totalVotes'] + parseInt(rows[r]['arr'][15].replace(",",""));
          if (partyDict[p]['party'] === rows[r]['arr'][10]) {
            partyDict[p]['partyVotes'] = partyDict[p]['partyVotes'] + parseInt(rows[r]['arr'][15].replace(",",""));
            if (rows[r]['arr'][21] === 'W' || rows[r]['arr'][21] === 'WW') {
              partyDict[p]['partyDists'] = partyDict[p]['partyDists'] + 1;
            }
          }
        }
      }
    }
    for (let p=0;p<partyDict.length;p++) {
      partyDict[p]['pctOfVotes'] = partyDict[p]['partyVotes']/partyDict[p]['totalVotes'];
      partyDict[p]['pctOfDists'] = partyDict[p]['partyDists']/partyDict[p]['totalDists'];
    }
    partyDict = _.orderBy(partyDict,['pctOfVotes'],['desc']);

    for (let p=0;p<partyDict.length;p++) {
      electionResults.push(partyDict[p]);
    }

    var xv = 40;
    var xd = 40;
    for (let p=0;p<partyDict.length;p++) {
      var c;
      if (partyDict[p]['party'] === 'D') {
        c = color(0,0,255);
      } else if (partyDict[p]['party'] === 'R') {
        c = color(255,0,0);
      } else {
        c = color(150);
      }
      fill(c);

      // percent of votes stacked bar
      rect(xv,hght+2*((hght/stList.length)*(s)),(lngth-100)*partyDict[p]['pctOfVotes'],hght/stList.length);
      xv = xv + ((lngth-100)*partyDict[p]['pctOfVotes']);

      // percent of districts stacked bar
      rect(xd,hght+2*((hght/stList.length)*(s))+hght/stList.length,(lngth-100)*partyDict[p]['pctOfDists'],hght/stList.length);
      xd = xd + ((lngth-100)*partyDict[p]['pctOfDists']);
      fill(0);
    }

    // console.log(partyDict);

    text(stList[s],10,hght+2*((hght/stList.length)*(s+1)));
  }
  console.log(electionResults);
}

function draw() {
}
