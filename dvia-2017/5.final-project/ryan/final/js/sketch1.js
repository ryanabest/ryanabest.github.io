var table;
var stList;

var lngth = 400;
var hght = 200;

function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("assets/2012_House_and_Senate_Cleaned.csv", "csv", "header");
}

function setup() {
  // background(50);
  stList = [];
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

  }
  console.log(electionResults);
}
