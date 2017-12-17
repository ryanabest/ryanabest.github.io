var table;
var stList;


function preload() {
    // load the CSV data into our `table` variable and clip out the header row
    table = loadTable("assets/2012_House_and_Senate_Cleaned.csv", "csv", "header");
}

function setup() {
  var distResults = [];
  var stateResults = [];
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
    var distDict = [];
    var partyList = [];
    var partyStateResults = []
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
      for (let d=0;d<distList.length;d++) {
        distDict.push({state:stList[s],stateName:'',dist:distList[d],distID:stList[s] + "-" + distList[d],party:partyList[p],candName:'',candID:'',partyVotes:0,wastedVotes:0,totalVotes:0,pctOfVotes:0,winningVoteCount:0,wonDistFlag:0,row:''});
      }
    }

    //overall votes
    for (let d=0;d<distDict.length;d++) {
      for (let r=0;r<rows.length;r++) {
        if (distDict[d]['dist'] === rows[r]['obj']['D']) {
          distDict[d]['totalVotes'] = distDict[d]['totalVotes'] + parseInt(rows[r]['arr'][15].replace(",",""));
          distDict[d]['stateName'] = rows[r]['obj']['STATE'];
        }
      }
      distDict[d]['winningVoteCount'] = Math.ceil(distDict[d]['totalVotes']/2);
    }

    for (let d=0;d<distDict.length;d++) {
      for (let r=0;r<rows.length;r++) {
        if (isNaN(parseInt(rows[r]['arr'][15].replace(",","")))) {
        } else {
          if (distDict[d]['party'] === rows[r]['obj']['PARTY'] && distDict[d]['dist'] === rows[r]['obj']['D']) {
            distDict[d]['partyVotes'] = distDict[d]['partyVotes'] + parseInt(rows[r]['arr'][15].replace(",",""));
            distDict[d]['candName'] = rows[r]['obj']['CANDIDATE NAME'];
            distDict[d]['candID'] = rows[r]['obj']['FEC ID#'];
            distDict[d]['row'] = rows[r]['obj']['1'];
          } if (distDict[d]['party'] === rows[r]['obj']['PARTY'] && distDict[d]['dist'] === rows[r]['obj']['D'] && rows[r]['obj']['GE WINNER INDICATOR'] === 'W') {
            distDict[d]['wonDistFlag'] = 1;
          }
        }
      }
      distDict[d]['pctOfVotes'] = distDict[d]['partyVotes']/distDict[d]['totalVotes'];
      if (distDict[d]['wonDistFlag'] === 0) {
        distDict[d]['wastedVotes'] = distDict[d]['partyVotes'];
      } else {
        distDict[d]['wastedVotes'] = distDict[d]['partyVotes'] - distDict[d]['winningVoteCount'];
      }
    }

    // console.log(distDict);

    for (let p=0;p<partyList.length;p++) {
      partyStateResults.push({state:stList[s],stateName:'',party:partyList[p],partyVotes:0,totalVotes:0,pctOfVotes:0,wastedVotes:0,oppWastedVotes:0,effGap:0,partyDists:0,totalDists:0,pctOfDists:0,expctDists:0,netRepDiff:0});
    }

    for (let p=0;p<partyStateResults.length;p++) {
      for (let r=0;r<rows.length;r++) {
        if (partyStateResults[p]['state'] === rows[r]['obj']['STATE ABBREVIATION']) {
          partyStateResults[p]['totalVotes'] = partyStateResults[p]['totalVotes'] + parseInt(rows[r]['arr'][15].replace(",",""));
          partyStateResults[p]['stateName'] = rows[r]['obj']['STATE'];
        }
      }
      for (let d=0;d<distDict.length;d++) {
        if (distDict[d]['party'] === partyStateResults[p]['party']) {
          partyStateResults[p]['partyVotes'] = partyStateResults[p]['partyVotes'] + distDict[d]['partyVotes'];
          partyStateResults[p]['partyDists'] = partyStateResults[p]['partyDists'] + distDict[d]['wonDistFlag'];
          partyStateResults[p]['wastedVotes'] = partyStateResults[p]['wastedVotes'] + distDict[d]['wastedVotes'];
          partyStateResults[p]['totalDists'] = distList.length;
        } else if (distDict[d]['party'] === 'D' || distDict[d]['party'] === 'R'){
          partyStateResults[p]['oppWastedVotes'] = partyStateResults[p]['oppWastedVotes'] + distDict[d]['wastedVotes'];
        }
      }
      partyStateResults[p]['pctOfVotes'] = partyStateResults[p]['partyVotes']/partyStateResults[p]['totalVotes'];
      partyStateResults[p]['pctOfDists'] = partyStateResults[p]['partyDists']/partyStateResults[p]['totalDists'];
      partyStateResults[p]['expctDists'] = partyStateResults[p]['pctOfVotes'] * partyStateResults[p]['totalDists'];
      partyStateResults[p]['effGap'] = (partyStateResults[p]['wastedVotes']-partyStateResults[p]['oppWastedVotes'])/partyStateResults[p]['totalVotes'];
      partyStateResults[p]['netRepDiff'] = partyStateResults[p]['partyDists']-partyStateResults[p]['expctDists'];
    }

    for (let d=0;d<distDict.length;d++) {
      distResults.push(distDict[d]);
    }

    for (let p=0;p<partyStateResults.length;p++) {
      stateResults.push(partyStateResults[p]);
    }
  }
  distResults = _.groupBy(distResults,"distID");
  stateResults = _.groupBy(stateResults,"state");

  saveJSONObject(distResults,"distResults.json");
  saveJSONObject(stateResults,"stateResults.json");
  // console.log(stateResults);
  // console.log(distResults);
}
