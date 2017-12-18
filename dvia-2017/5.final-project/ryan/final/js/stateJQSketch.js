var stateResults;
var effGapChart = [];

var jqState;
var jqStateName;
var stateMetric;
var axisMax;

$.getJSON("assets/stateResults.json", loadStateJson);

function loadStateJson(json) {
  stateResults = json;
  jqState = 'OH';
  stateMetric = 'EffGap';
  pushStates(stateResults);
  drawEffGaps();
  drawStateSummaryForDistChart();
  changeStateMetric();
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

var stateName;
var textClass;
var stateWinParty;
var stateSeatGap;
var stateEffGap;
var statePartyVotes;
var stateTotalVotes;
var statePartyVotePercent;
var statePartyDists;
var stateTotalDists;
var statePartyDistPercent;
var statePartyDistExpected;

function getStateStats(st) {
  let states = Object.keys(stateResults);
  for (let e=0;e<effGapChart.length;e++) {
    if (effGapChart[e]['state'] === st) {
      stateName = effGapChart[e]['stateName'];
      stateTotalVotes = effGapChart[e]['totalVotes'].toLocaleString();
      stateTotalDists = effGapChart[e]['totalDists'];
      if (stateMetric === 'EffGap' && effGapChart[e]['effGap'] > 0) { //Democrat
        stateEffGap = Math.round(Math.abs(effGapChart[e]['effGap'])*100) + '%';
        stateWinParty = 'Democrats';
        textClass = 'd-p';
        for (let i=0;i<states.length;i++) {
          for (let j=0;j<stateResults[states[i]].length;j++) {
            if (stateResults[states[i]][j]['state'] === st && stateResults[states[i]][j]['party'] === 'D') {
              statePartyVotes = stateResults[states[i]][j]['partyVotes'].toLocaleString();
              statePartyVotePercent = Math.round(Math.abs(stateResults[states[i]][j]['pctOfVotes'])*100) + '%';
              statePartyDists = stateResults[states[i]][j]['partyDists'];
              statePartyDistPercent = Math.round(Math.abs(stateResults[states[i]][j]['pctOfDists'])*100) + '%';
              statePartyDistExpected = String(Math.round(stateResults[states[i]][j]['expctDists']*10)/10);
              if (stateResults[states[i]][j]['netRepDiff'] > 0) {
                stateSeatGap = '+' + Math.round(stateResults[states[i]][j]['netRepDiff']*10)/10;
              } else {
                stateSeatGap = String(Math.round(stateResults[states[i]][j]['netRepDiff']*10)/10);
              }
            }
          }
        }
      } else if (stateMetric === 'SeatDiff' && effGapChart[e]['netRepDiff'] < 0) { //Democrat
        stateEffGap = Math.round(effGapChart[e]['effGap']*100) + '%';
        stateWinParty = 'Democrats';
        textClass = 'd-p';
        for (let i=0;i<states.length;i++) {
          for (let j=0;j<stateResults[states[i]].length;j++) {
            if (stateResults[states[i]][j]['state'] === st && stateResults[states[i]][j]['party'] === 'D') {
              statePartyVotes = stateResults[states[i]][j]['partyVotes'].toLocaleString();
              statePartyVotePercent = Math.round(Math.abs(stateResults[states[i]][j]['pctOfVotes'])*100) + '%';
              statePartyDists = stateResults[states[i]][j]['partyDists'];
              statePartyDistPercent = Math.round(Math.abs(stateResults[states[i]][j]['pctOfDists'])*100) + '%';
              statePartyDistExpected = String(Math.round(stateResults[states[i]][j]['expctDists']*10)/10);
              if (stateResults[states[i]][j]['netRepDiff'] > 0) {
                stateSeatGap = '+' + Math.round(stateResults[states[i]][j]['netRepDiff']*10)/10;
              } else {
                stateSeatGap = String(Math.round(stateResults[states[i]][j]['netRepDiff']*10)/10);
              }
            }
          }
        }
      } else if (stateMetric === 'EffGap' && effGapChart[e]['effGap'] < 0) { //Republican
        stateEffGap = Math.round(Math.abs(effGapChart[e]['effGap'])*100) + '%';
        stateWinParty = 'Republicans';
        textClass = 'r-p';
        statePartyVotes = effGapChart[e]['partyVotes'].toLocaleString();
        statePartyVotePercent = Math.round(Math.abs(effGapChart[e]['pctOfVotes'])*100) + '%';
        statePartyDists = effGapChart[e]['partyDists'];
        statePartyDistPercent = Math.round(Math.abs(effGapChart[e]['pctOfDists'])*100) + '%';
        statePartyDistExpected = String(Math.round(effGapChart[e]['expctDists']*10)/10);
        if (effGapChart[e]['netRepDiff'] > 0) {
          stateSeatGap = '+' + Math.round(effGapChart[e]['netRepDiff']*10)/10;
        } else {
          stateSeatGap = String(Math.round(effGapChart[e]['netRepDiff']*10)/10);
        }
      } else if (stateMetric === 'SeatDiff' && effGapChart[e]['netRepDiff'] > 0) { //Republican
        stateEffGap = Math.round(-effGapChart[e]['effGap']*100) + '%';
        stateWinParty = 'Republicans';
        textClass = 'r-p';
        statePartyVotes = effGapChart[e]['partyVotes'].toLocaleString();
        statePartyVotePercent = Math.round(Math.abs(effGapChart[e]['pctOfVotes'])*100) + '%';
        statePartyDists = effGapChart[e]['partyDists'];
        statePartyDistPercent = Math.round(Math.abs(effGapChart[e]['pctOfDists'])*100) + '%';
        statePartyDistExpected = String(Math.round(effGapChart[e]['expctDists']*10)/10);
        if (effGapChart[e]['netRepDiff'] > 0) {
          stateSeatGap = '+' + Math.round(effGapChart[e]['netRepDiff']*10)/10;
        } else {
          stateSeatGap = String(Math.round(effGapChart[e]['netRepDiff']*10)/10);
        }
      }

      jqStateName = effGapChart[e]['stateName'];
    }
  }
}

function drawEffGaps() {
  let barProportion;

  if (stateMetric === 'EffGap') {
    axisMax = Math.max(Math.abs(effGapChart[effGapChart.length-1]['effGap']),Math.abs(effGapChart[0]['effGap']));
  } else if (stateMetric === 'SeatDiff') {
    // NEED TO ADD METRIC FOR Seat Differential AND TEST //
  }

  //tooltips
  for (let e=0;e<effGapChart.length;e++) {
    let state = effGapChart[e]['state'];
    drawTooltip(state);
  }

  for (let e=0;e<effGapChart.length;e++) {
    let state = effGapChart[e]['state'];

    let divID = "state-row-" + state;
    let divClass = "state-eff";
    let divOrder = "order: " + e;
    let stateDiv = $("<div></div>", {id:divID, "class":divClass, "style":divOrder});
    $(".flex-container").append(stateDiv);

    if (stateMetric === 'EffGap') {
      barProportion = -effGapChart[e]['effGap']/axisMax;
    } else if (stateMetric === 'SeatDiff') {
      // NEED TO ADD METRIC FOR Seat Differential AND TEST //
    }

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

    let percentValue = (Math.abs(barProportion)*100)*0.35;
    let colorPercent = percentValue + '%';
    let whitePercent = (50-percentValue) + '%';

    let barText = state + ': ' + Math.round(Math.abs(effGapChart[e]['effGap'])*100) + '%';

    if (barProportion > 0) {
      $('#' + leftWhiteDivID).css("width","50%");
      $('#' + leftBlueDivID).css("width","0%");
      $('#' + rightRedDivID).css("width",colorPercent);
      $('#' + rightWhiteDivID).css("width",whitePercent);
      $('#' + rightWhiteDivID).append('<p>' + barText + '</p>');
      $('#' + rightRedDivID).click(function() {
        jqState = state;
        $(".dist-div").remove();
        $(".state-summ").remove();
        pushDists(rawDistData);
        drawDists();
        drawStateSummaryForDistChart();
        $('html, body').animate({
          scrollTop: $(".state-summ").offset().top
        }, 1000);
      });
    } else {
      $('#' + leftWhiteDivID).css("width",whitePercent);
      $('#' + leftBlueDivID).css("width",colorPercent);
      $('#' + rightRedDivID).css("width","0%");
      $('#' + rightWhiteDivID).css("width","50%");
      $('#' + leftWhiteDivID).append('<p>' + barText + '</p>');
      $('#' + leftBlueDivID).click(function() {
        jqState = state;
        $(".dist-div").remove();
        $(".state-summ").remove();
        pushDists(rawDistData);
        drawDists();
        drawStateSummaryForDistChart();
        $('html, body').animate({
          scrollTop: $(".state-summ").offset().top
        }, 1000);
      });
    }
    let tooltipDivID = 'tooltip-'+state;

    //show tooltips on hover
    $('#' + leftBlueDivID).mouseenter(function() {
      $('#' + tooltipDivID).css("display","block");
    }).mouseleave( function() {
      $('#' + tooltipDivID).css("display","none");
    });

    $('#' + rightRedDivID).mouseenter(function() {
      $('#' + tooltipDivID).css("display","block");
    }).mouseleave( function() {
      $('#' + tooltipDivID).css("display","none");
    });
  }

  //fairness benchmark lines
  let lineDiv1 = $('<div></div>', {id:'line-div-1','class':'line-div'});
  $('#eff-gap-chart').append(lineDiv1);
  let lineDiv2 = $('<div></div>', {id:'line-div-2','class':'line-div'});
  $('#eff-gap-chart').append(lineDiv2);
  let lineHght = effGapChart.length * 18;
  let lineTop = "-" + (lineHght+25) + "px";
  $('#line-div-1').css("top",lineTop);
  $('#line-div-2').css("top","-" + ((lineHght * 2)+25) + "px");
  $('.line-div').css("height",lineHght);

  let benchmark = 0.08;
  let benchmarkProportion = benchmark/axisMax;
  let benchmarkPercentValue = (benchmarkProportion*100)*0.35;

  $('#line-div-1').css("left",(50-benchmarkPercentValue) + '%');
  $('#line-div-2').css("left",(50+benchmarkPercentValue) + '%');
  $('#eff-gap-chart').css("height",lineHght);
  drawEffAxes();
}

function drawTooltip(state) {
  let stateTooltipDivID = 'tooltip-' + state;
  let stateTooltipDivClass = 'tooltip';
  let stateTooltipDiv = $('<div></div>', {id:stateTooltipDivID,"class":stateTooltipDivClass});
  $('.flex-container').append(stateTooltipDiv);
  // console.log(state);

  getStateStats(state);

  let tooltipMetric;
  let tooltipMetricName;
  if (stateMetric === 'EffGap') {
    tooltipMetricName = 'efficiency gap';
    tooltipMetric = stateEffGap;
  } else if (stateMetric === 'SeatDiff') {
    tooltipMetricName = 'proportional seat differential';
    tooltipMetric = stateSeatGap;
  }

  $('#' + stateTooltipDivID).append(
    '<h1>'+stateName+'</h1>'+
    '<h2><span class='+textClass+'>'+tooltipMetric+'</span> '+tooltipMetricName+' benefitting <span class='+textClass+'>'+stateWinParty+'</span>, who won:</h2>'+
    '<h3><span class='+textClass+'>'+statePartyVotes+'</span> of '+stateTotalVotes+' votes ('+statePartyVotePercent+')<br>' +
    '<span class ='+textClass+'>'+statePartyDists+'</span> of '+stateTotalDists+' district seats ('+statePartyDistPercent+')</h3>' +
    '<p>Click to see district results</p>'
  );
}

function drawStateSummaryForDistChart() {
  getStateStats(jqState);
  let stateSummDivID = 'state-summ-' + jqState;
  let stateSummDivClass = 'state-summ';
  let stateSummDiv = $('<div></div>', {id:stateSummDivID, "class":stateSummDivClass});
  $("#dist-chart-title").append(stateSummDiv);
  $('#' + stateSummDivID).append("<button class='dropdown'>"+jqStateName+"</button>");
  $('#' + stateSummDivID).append(
    '<p><span class='+textClass+'>'+stateEffGap+'</span> efficiency gap ' +
    'and <span class='+textClass+'>'+stateSeatGap+'</span> proportional seat differential ' +
    'benefitting <span class='+textClass+'>'+stateWinParty+'</span></p><br><br>'
  );

  drawStateDropdown();
}

function drawStateDropdown() {
  let stDropdownList = [];
  for (let e=0;e<effGapChart.length;e++) {
    stDropdownList.push({stateName:effGapChart[e]['stateName'],state:effGapChart[e]['state']});
  }
  stDropdownList = _.orderBy(stDropdownList,['stateName'],['asc']);

  let dropdownContentDivID = 'dropdown-content'
  let dropdownContentDiv = $('<div></div>',{id:dropdownContentDivID});
  $('.dropdown').append(dropdownContentDiv);
  for (let s=0;s<stDropdownList.length;s++) {
    let dropdownStateButtonID = 'dropdown-button-' + stDropdownList[s]['state'];
    let dropdownStateButtonClass = 'dropdown-button';
    $('#' + dropdownContentDivID).append(
      '<button class=' + dropdownStateButtonClass + ' id=' + dropdownStateButtonID + '>' +
      stDropdownList[s]['stateName'] + '</button><br>'
    );
    $("#" + dropdownStateButtonID).click(function() {
      jqState = stDropdownList[s]['state'];
      $(".dist-div").remove();
      $(".state-summ").remove();
      pushDists(rawDistData);
      drawDists();
      drawStateSummaryForDistChart();
      drawStateDropdown();
    });
  }
}

function changeStateMetric() {
  $('#eff-button').click(function () {
    $('#eff-button').css("background-color","rgb(100,100,100)");
    $('#eff-button').css("color","#fff");
    $('#seat-button').css("background-color","#fff");
    $('#seat-button').css("color","#000");
    stateMetric = 'EffGap';
    axisMax = Math.max(Math.abs(effGapChart[effGapChart.length-1]['effGap']),Math.abs(effGapChart[0]['effGap']));
    // console.log(stateMetric);
    drawEffAxes();
  });
  $('#seat-button').click(function () {
    $('.left-white p').remove();
    $('.right-white p').remove();
    $('.line-div').css("background-color","rgba(200,200,200,0.0)");
    $('#seat-button').css("background-color","rgb(100,100,100)");
    $('#seat-button').css("color","#fff");
    $('#eff-button').css("background-color","#fff");
    $('#eff-button').css("color","#000");
    stateMetric = 'SeatDiff';
    effGapChart = _.orderBy(effGapChart,['netRepDiff'],['desc']);
    var netRepDiffDict = [];
    for (let e=0;e<effGapChart.length;e++) {
      if (effGapChart[e]['netRepDiff']>0) {
        // console.log(effGapChart[e]['netRepDiff']);
        netRepDiffDict.push({state:effGapChart[e]['state'],party:'R',netRepDiff:effGapChart[e]['netRepDiff']});
      } else {
        let states = Object.keys(stateResults);
        for (let i=0;i<states.length;i++) {
          for (let j=0;j<stateResults[states[i]].length;j++) {
            if (stateResults[states[i]][j]['state'] === effGapChart[e]['state'] && stateResults[states[i]][j]['party'] === 'D') {
              netRepDiffDict.push({state:effGapChart[e]['state'],party:'D',netRepDiff:-stateResults[states[i]][j]['netRepDiff']});
              // console.log(stateResults[states[i]][j]['netRepDiff']);
            }
          }
        }
      }
    }
    netRepDiffDict = _.orderBy(netRepDiffDict,['netRepDiff'],['desc']);
    axisMax = Math.max(Math.abs(netRepDiffDict[netRepDiffDict.length-1]['netRepDiff']),Math.abs(netRepDiffDict[0]['netRepDiff']));
    $('.tooltip').remove();
    // let stateDivList = [];
    for (let n=0;n<netRepDiffDict.length;n++) {
      let state = effGapChart[n]['state'];
      drawTooltip(state);

      let barProportion = netRepDiffDict[n]['netRepDiff']/axisMax;
      let percentValue = (Math.abs(barProportion)*100)*0.35
      let colorPercent = percentValue + '%';
      let whitePercent = ((35-percentValue) + 15) + '%';
      let stateDivID = 'state-row-' + state;
      let leftWhiteDivID = 'left-white-' + state;
      let leftBlueDivID = 'left-blue-' + state;
      let rightRedDivID = 'right-red-' + state;
      let rightWhiteDivID = 'right-white-' + state;

      let barText = state + ': ' + Math.round(Math.abs(netRepDiffDict[n]['netRepDiff'])*10)/10;

      $('#' + stateDivID).css("order",n);

      if (netRepDiffDict[n]['netRepDiff'] > 0) { //Republican-won state
        $('#' + leftWhiteDivID).animate({"width":"50%"},1000);
        $('#' + leftBlueDivID).animate({"width":"0%"},1000);
        $('#' + rightRedDivID).animate({"width":colorPercent},1000);
        $('#' + rightWhiteDivID).animate({"width":whitePercent},1000);
        $('#' + rightWhiteDivID).append('<p>' + barText + '</p>');
        $('#' + rightRedDivID).click( function() {
          jqState = state;
          $(".dist-div").remove();
          $(".state-summ").remove();
          pushDists(rawDistData);
          drawDists();
          drawStateSummaryForDistChart();
          $('html, body').animate({
            scrollTop: $("#dist-chart-title").offset().top
          }, 1000);
        });
      } else {
        $('#' + leftWhiteDivID).animate({"width":whitePercent},1000);
        $('#' + leftBlueDivID).animate({"width":colorPercent},1000);
        $('#' + rightRedDivID).animate({"width":"0%"},1000);
        $('#' + rightWhiteDivID).animate({"width":"50%"},1000);
        $('#' + leftWhiteDivID).append('<p>' + barText + '</p>');
        $('#' + leftBlueDivID).click( function() {
          jqState = state;
          $(".dist-div").remove();
          $(".state-summ").remove();
          pushDists(rawDistData);
          drawDists();
          drawStateSummaryForDistChart();
          $('html, body').animate({
            scrollTop: $(".state-summ").offset().top
          }, 1000);
        });
      }

      let tooltipDivID = 'tooltip-'+state;

      //show tooltips on hover
      $('#' + leftBlueDivID).mouseenter(function() {
        $('#' + tooltipDivID).css("display","block");
      }).mouseleave( function() {
        $('#' + tooltipDivID).css("display","none");
      });

      $('#' + rightRedDivID).mouseenter(function() {
        $('#' + tooltipDivID).css("display","block");
      }).mouseleave( function() {
        $('#' + tooltipDivID).css("display","none");
      });
    }
    drawSeatAxes();
  });

  $('#eff-button').click(function () {
    $('.left-white p').remove();
    $('.right-white p').remove();
    $('.line-div').css("background-color","rgba(200,200,200,0.5)");
    $('#eff-button').css("background-color","rgb(100,100,100)");
    $('#eff-button').css("color","#fff");
    $('#seat-button').css("background-color","#fff");
    $('#seat-button').css("color","#000");
    stateMetric = 'EffGap';
    effGapChart = _.orderBy(effGapChart,['effGap'],['asc']);

    axisMax = Math.max(Math.abs(effGapChart[effGapChart.length-1]['effGap']),Math.abs(effGapChart[0]['effGap']));
    $('.tooltip').remove();
    // let stateDivList = [];
    for (let e=0;e<effGapChart.length;e++) {
      let state = effGapChart[e]['state'];
      drawTooltip(state);

      let barProportion = -effGapChart[e]['effGap']/axisMax;
      let percentValue = (Math.abs(barProportion)*100)*0.35
      let colorPercent = percentValue + '%';
      let whitePercent = ((35-percentValue) + 15) + '%';
      let stateDivID = 'state-row-' + state;
      let leftWhiteDivID = 'left-white-' + state;
      let leftBlueDivID = 'left-blue-' + state;
      let rightRedDivID = 'right-red-' + state;
      let rightWhiteDivID = 'right-white-' + state;
      let barText = state + ': ' + Math.round(Math.abs(effGapChart[e]['effGap'])*100) + '%';

      $('#' + stateDivID).css("order",e);

      if (effGapChart[e]['effGap'] < 0) { //Republican-won state
        $('#' + leftWhiteDivID).animate({"width":"50%"},1000);
        $('#' + leftBlueDivID).animate({"width":"0%"},1000);
        $('#' + rightRedDivID).animate({"width":colorPercent},1000);
        $('#' + rightWhiteDivID).animate({"width":whitePercent},1000);
        $('#' + rightWhiteDivID).append('<p>' + barText + '</p>');
        $('#' + rightRedDivID).click( function() {
          jqState = state;
          $(".dist-div").remove();
          $(".state-summ").remove();
          pushDists(rawDistData);
          drawDists();
          drawStateSummaryForDistChart();
          $('html, body').animate({
            scrollTop: $(".state-summ").offset().top
          }, 1000);
        });
      } else { //Democrat-won state
        $('#' + leftWhiteDivID).animate({"width":whitePercent},1000);
        $('#' + leftBlueDivID).animate({"width":colorPercent},1000);
        $('#' + rightRedDivID).animate({"width":"0%"},1000);
        $('#' + rightWhiteDivID).animate({"width":"50%"},1000);
        $('#' + leftWhiteDivID).append('<p>' + barText + '</p>');
        $('#' + leftBlueDivID).click( function() {
          jqState = state;
          $(".dist-div").remove();
          $(".state-summ").remove();
          pushDists(rawDistData);
          drawDists();
          drawStateSummaryForDistChart();
          $('html, body').animate({
            scrollTop: $(".state-summ").offset().top
          }, 1000);
        });
      }

      let tooltipDivID = 'tooltip-'+state;

      //show tooltips on hover
      $('#' + leftBlueDivID).mouseenter(function() {
        $('#' + tooltipDivID).css("display","block");
      }).mouseleave( function() {
        $('#' + tooltipDivID).css("display","none");
      });

      $('#' + rightRedDivID).mouseenter(function() {
        $('#' + tooltipDivID).css("display","block");
      }).mouseleave( function() {
        $('#' + tooltipDivID).css("display","none");
      });
    }
  });
}

function drawEffAxes() {
  $('#eff-gap-axis-1').empty();
  $('#eff-gap-axis-2').empty();
  $('#eff-gap-axis-1').css("display","");
  $('#seat-gap-axis-1').css("display","none");
  $('#eff-gap-axis-2').css("display","");
  $('#seat-gap-axis-2').css("display","none");
  /*Eff Gap Axis */
  let effBenchmark = 0.05;
  let effNumOfTicks = Math.floor(axisMax/effBenchmark);
  let effBenchmarkProportion = effBenchmark/axisMax;
  let effPercentValue = (effBenchmarkProportion*100)*0.5;//(Math.abs(effBenchmarkProportion)*100)*0.35;
  let effDivSize = effPercentValue + '%';


  let effTickDiv1TextID = 'eff-tick-1-text';
  let effTickDiv1TextClass = 'eff-tick-1';
  let effTickDiv1Text = $('<div></div>',{id:effTickDiv1TextID, "class":effTickDiv1TextClass});
  $('#eff-gap-axis-1').append(effTickDiv1Text);
  $('#' + effTickDiv1TextID).append("<p>8% gap suggested by experts - anything beyond these thresholds is considered too extreme</p>");

  let effTickDiv1ZeroID = 'eff-tick-1-zero';
  let effTickDiv1ZeroClass = 'eff-tick-1';
  let effTickDiv1Zero = $('<div></div>',{id:effTickDiv1ZeroID, "class":effTickDiv1ZeroClass});
  $('#eff-gap-axis-1').append(effTickDiv1Zero);
  $('#' + effTickDiv1ZeroID).append("<p>0%<br>|</p>");


  let effTickDiv2DummyID = 'eff-tick-2-dummy';
  let effTickDiv2DummyClass = 'eff-tick-2';
  let effTickDiv2Dummy = $('<div></div>',{id:effTickDiv2DummyID, "class":effTickDiv2DummyClass});
  $('#eff-gap-axis-2').append(effTickDiv2Dummy);

  let effDummyDivSize = (50-(effNumOfTicks*((effBenchmarkProportion/2)*100))) + '%';
  $('#' + effTickDiv2DummyID).css("width",effDummyDivSize);

  for (let n=0;n<effNumOfTicks;n++) {
    let effTickDiv1ID = 'eff-tick-1-' + n;
    let effTickDiv1Class = 'eff-tick-1'
    let effTickDiv1 = $('<div></div>', {id:effTickDiv1ID, "class":effTickDiv1Class});
    $('#eff-gap-axis-1').append(effTickDiv1);
    $('#' + effTickDiv1ID).append('<p>' + String(((effBenchmark*100)*(n+1))) + '%<br>|</p>');
    $('#' + effTickDiv1ID).css("width",effDivSize);

    let effTickDiv2ID = 'eff-tick-2-' + n;
    let effTickDiv2Class = 'eff-tick-2'
    let effTickDiv2 = $('<div></div>', {id:effTickDiv2ID, "class":effTickDiv2Class});
    $('#eff-gap-axis-2').append(effTickDiv2);
    $('#' + effTickDiv2ID).append('<p>|<br>' + String(((effBenchmark*100)*Math.abs(effNumOfTicks-n))) + '%<p>');
    $('#' + effTickDiv2ID).css("width",effDivSize);
  }

  let effTickDiv2ZeroID = 'eff-tick-2-zero';
  let effTickDiv2ZeroClass = 'eff-tick-2';
  let effTickDiv2Zero = $('<div></div>',{id:effTickDiv2ZeroID, "class":effTickDiv2ZeroClass});
  $('#eff-gap-axis-2').append(effTickDiv2Zero);
  $('#' + effTickDiv2ZeroID).css("width","50%");
  $('#' + effTickDiv2ZeroID).append('<p>|<br>0%<p>');
}

function drawSeatAxes() {
  $('#seat-gap-axis-1').empty();
  $('#seat-gap-axis-2').empty();
  $('#seat-gap-axis-1').css("display","");
  $('#eff-gap-axis-1').css("display","none");
  $('#seat-gap-axis-2').css("display","");
  $('#eff-gap-axis-2').css("display","none");
  /* Seat Diff Axis */
  let seatBenchmark = 1;
  let seatNumOfTicks = Math.floor(axisMax/seatBenchmark);
  let seatBenchmarkProportion = seatBenchmark/axisMax;
  let seatPercentValue = (seatBenchmarkProportion*100)*0.5;
  let seatDivSize = seatPercentValue + '%';

  let seatTickDiv1ZeroID = 'seat-tick-1-zero';
  let seatTickDiv1ZeroClass = 'seat-tick-1';
  let seatTickDiv1Zero = $('<div></div>',{id:seatTickDiv1ZeroID, "class":seatTickDiv1ZeroClass});
  $('#seat-gap-axis-1').append(seatTickDiv1Zero);
  $('#' + seatTickDiv1ZeroID).append("<p>0<br>|</p>");

  let seatTickDiv2DummyID = 'seat-tick-2-dummy';
  let seatTickDiv2DummyClass = 'seat-tick-2';
  let seatTickDiv2Dummy = $('<div></div>',{id:seatTickDiv2DummyID, "class":seatTickDiv2DummyClass});
  $('#seat-gap-axis-2').append(seatTickDiv2Dummy);

  let seatDummyDivSize = (50-(seatNumOfTicks*((seatBenchmarkProportion/2)*100))) + '%';
  $('#' + seatTickDiv2DummyID).css("width",seatDummyDivSize);

  for (let n=0;n<seatNumOfTicks;n++) {
    let seatTickDiv1ID = 'seat-tick-1-' + n;
    let seatTickDiv1Class = 'seat-tick-1'
    let seatTickDiv1 = $('<div></div>', {id:seatTickDiv1ID, "class":seatTickDiv1Class});
    $('#seat-gap-axis-1').append(seatTickDiv1);
    $('#' + seatTickDiv1ID).append('<p>' + String(((seatBenchmark)*(n+1))) + '<br>|</p>');
    $('#' + seatTickDiv1ID).css("width",seatDivSize);

    let seatTickDiv2ID = 'seat-tick-2-' + n;
    let seatTickDiv2Class = 'seat-tick-2'
    let seatTickDiv2 = $('<div></div>', {id:seatTickDiv2ID, "class":seatTickDiv2Class});
    $('#seat-gap-axis-2').append(seatTickDiv2);
    $('#' + seatTickDiv2ID).append('<p>|<br>' + String(((seatBenchmark)*Math.abs(seatNumOfTicks-n))) + '<p>');
    $('#' + seatTickDiv2ID).css("width",seatDivSize);
  }

  let seatTickDiv2ZeroID = 'seat-tick-2-zero';
  let seatTickDiv2ZeroClass = 'seat-tick-2';
  let seatTickDiv2Zero = $('<div></div>',{id:seatTickDiv2ZeroID, "class":seatTickDiv2ZeroClass});
  $('#seat-gap-axis-2').append(seatTickDiv2Zero);
  $('#' + seatTickDiv2ZeroID).css("width","50%");
  $('#' + seatTickDiv2ZeroID).append('<p>|<br>0<p>');
}
