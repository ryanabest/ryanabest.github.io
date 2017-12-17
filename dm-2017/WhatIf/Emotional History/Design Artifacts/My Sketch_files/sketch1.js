var stateResults;
var effGapChart = [];

var jqState;

$.getJSON("assets/stateResults.json", loadJson);

function loadJson(json) {
  stateResults = json;
  pushStates(stateResults);
  drawEffGaps(effGapChart);
  jqState = 'NY';
  console.log(jqState);
}

function pushStates(obj) {
  let states = Object.keys(obj);
  for (let i=0;i<states.length;i++) {
    for (let j=0;j<obj[states[i]].length;j++) {
      if (obj[states[i]][j]['party'] === 'R' && obj[states[i]][j]['totalDists'] > 2) {
        effGapChart.push(obj[states[i]][j]);
      }
    }
  }
  effGapChart = _.orderBy(effGapChart,['effGap'],['asc']);
}

function drawEffGaps(effGapData) {
  let axisMax = Math.max(Math.abs(effGapData[effGapData.length-1]['effGap']),Math.abs(effGapData[0]['effGap']));
  for (let e=0;e<effGapData.length;e++) {
    let state = effGapData[e]['state'];

    let divID = "state-row-" + state;
    let divClass = "state-eff";
    let divOrder = "order: " + e;
    let stateDiv = $("<div></div>", {id:divID, "class":divClass, "style":divOrder});
    $(".flex-container").append(stateDiv);

    let barProportion = -effGapData[e]['effGap']/axisMax;

    let leftWhiteDivID = 'left-white-' + state;
    let leftWhiteDivClass = 'left-white';
    let leftBlueDivID = 'left-blue-' + state;
    let leftBlueDivClass = 'left-blue';
    let rightRedDivID = 'right-red-' + state;
    let rightRedDivClass = 'right-red';
    let rightWhiteDivID = 'right-white-' + state;
    let rightWhiteDivClass = 'right-white';

    let leftWhiteDiv = $('<div></div>', {id:leftWhiteDivID, "class":leftWhiteDivClass});
    let leftBlueDiv = $('<div></div>', {id:leftBlueDivID, "class":leftBlueDivClass});
    let rightRedDiv = $('<div></div>', {id:rightRedDivID, "class":rightRedDivClass});
    let rightWhiteDiv = $('<div></div>', {id:rightWhiteDivID, "class":rightWhiteDivClass});

    $('#' + divID).append(leftWhiteDiv);
    $('#' + divID).append(leftBlueDiv);
    $('#' + divID).append(rightRedDiv);
    $('#' + divID).append(rightWhiteDiv);

    // var brdrVal = .1;
    // var brdrPct = brdrVal + '%';
    // console.log((1-(2*brdrVal))/2);

    let percentValue = Math.floor(Math.abs(barProportion)*100)*0.4
    let colorPercent = percentValue + '%';
    let whitePercent = ((40-percentValue) + 10) + '%';

    let barText = state + ' - ' + Math.floor(Math.abs(effGapData[e]['effGap'])*100) + '%';

    if (barProportion > 0) {
      $('#' + leftWhiteDivID).css("width","50%");
      $('#' + leftBlueDivID).css("width","0%");
      $('#' + rightRedDivID).css("width",colorPercent);
      $('#' + rightWhiteDivID).css("width",whitePercent);
      $('#' + rightWhiteDivID).append('<p>' + barText + '</p>');
      $('#' + rightRedDivID).click(function() {jqState = state; console.log(jqState);})
    } else {
      $('#' + leftWhiteDivID).css("width",whitePercent);
      $('#' + leftBlueDivID).css("width",colorPercent);
      $('#' + rightRedDivID).css("width","0%");
      $('#' + rightWhiteDivID).css("width","50%");
      $('#' + leftWhiteDivID).append('<p>' + barText + '</p>');
      $('#' + leftBlueDivID).click(function() {jqState = state; console.log(jqState);})
    }
  }

  // draw 'fairness' benchmark lines
  function drawFairLines() {
    let benchmark = 0.08;
    for (let l=0;l=2;l++) {
      let lineDivID = 'line-div-' + (i+1);
      let lineDivClass = 'line-div';
    }
  }

}
