var effGap = function( sketch ) {
  var stateResults;
  var effGapChart = [];

  sketch.preload = function() {
    stateResults = sketch.loadJSON("assets/stateResults.json");
  }
  sketch.setup = function() {
    let effLngth = screen.width * 0.75;
    let effHght = screen.height;
    let cnv = sketch.createCanvas(effLngth,effHght);
    cnv.id('eff-gap');
    sketch.background(255);

    var states = Object.keys(stateResults);
    for (let s=0;s<states.length;s++) {
      for (let x=0;x<stateResults[states[s]].length;x++) {
        if (stateResults[states[s]][x]['party'] === "R" && stateResults[states[s]][x]['totalDists'] > 2) {
          effGapChart.push(stateResults[states[s]][x]);
        }
      }
    }
    effGapChart = _.orderBy(effGapChart,['effGap'],['asc']);


    let horMargin = 0.1;
    let totHorMargin = 2*horMargin;
    let vertMargin = 0.1;
    let totVertMargin = 2*vertMargin;

    // //axis
    // sketch.line(effLngth/2,effHght*vertMargin,effLngth/2,effHght*(1-vertMargin));

    function drawStateBar(effGap,state,i) {
      let effCol;
      let stateLabelDif;
      if (effGap > 0) {
        effCol = sketch.color(236,20,14);
        stateLabelDif = 5;
      } else {
        effCol = sketch.color(34,106,177);
        stateLabelDif = -20;
      }
      //y
      let barHeight = (effHght*(1-vertMargin)-effHght*vertMargin)/effGapChart.length;
      let y = (effHght*vertMargin)+(i*barHeight);

      //x
      let x = effLngth/2;
      let axisMax = Math.max(Math.abs(effGapChart[effGapChart.length-1]['effGap']),Math.abs(effGapChart[0]['effGap']));
      let axisDiff = (effLngth/2) - (effLngth*horMargin);
      let barIncrease = axisDiff/axisMax;
      let barWidth = effGap * barIncrease;

      sketch.stroke(effCol);
      sketch.fill(effCol);
      sketch.rect(x,y,barWidth,barHeight);
      sketch.text(state,x+barWidth+stateLabelDif,y+(barHeight*0.7));

    }

    for (let e=0;e<effGapChart.length;e++) {
      drawStateBar(-effGapChart[e]['effGap'],effGapChart[e]['state'],e);
    }

  }
}


// var myp5 = new p5(effGap,'eff-gap');

var distChart = function( sketch ) {
  var distResults;
  var distChart = [];

  sketch.preload = function() {
    distResults = sketch.loadJSON("assets/distResults.json");
  }

  sketch.setup = function () {
    let distLngth = screen.width * 0.75;
    let distHght = screen.height;
    let cnv = sketch.createCanvas(distLngth,distHght);
    cnv.id('dist-chart');
    sketch.background(0);

    var dists = Object.keys(distResults);
    var stateDists = [];
    //test with California
    for (let d=0;d<dists.length;d++) {
      if (dists[d].substring(0,2) === jqState) {
        stateDists.push({state:jqState,stateName:'',dist:dists[d],rVotes:0,dVotes:0,oVotes:0,totalVotes:0,votesToWin:0,winningParty:''});
      }
      for (let x=0;x<distResults[dists[d]].length;x++) {
        if (distResults[dists[d]][x]['state'] === jqState) {
          for (let s=0;s<stateDists.length;s++) {
            stateDists[s]['stateName'] = distResults[dists[d]][x]['stateName'];
            if (distResults[dists[d]][x]['party'] === 'R' && distResults[dists[d]][x]['distID'] === stateDists[s]['dist']) {
              stateDists[s]['rVotes'] = distResults[dists[d]][x]['partyVotes'];
              stateDists[s]['totalVotes'] = distResults[dists[d]][x]['totalVotes'];
              stateDists[s]['votesToWin'] = distResults[dists[d]][x]['winningVoteCount'];
              if (distResults[dists[d]][x]['wonDistFlag'] === 1) {
                stateDists[s]['winningParty'] = 'R';
              }
            } else if (distResults[dists[d]][x]['party'] === 'D' && distResults[dists[d]][x]['distID'] === stateDists[s]['dist']) {
              stateDists[s]['dVotes'] = distResults[dists[d]][x]['partyVotes'];
              if (distResults[dists[d]][x]['wonDistFlag'] === 1) {
                stateDists[s]['winningParty'] = 'D';
              }
            } else if (distResults[dists[d]][x]['distID'] === stateDists[s]['dist']) {
              stateDists[s]['oVotes'] = stateDists[s]['oVotes'] + distResults[dists[d]][x]['partyVotes'];
              if (distResults[dists[d]][x]['wonDistFlag'] === 1) {
                stateDists[s]['winningParty'] = distResults[dists[d]][x]['party'];
              }
            }
          }
          distChart.push(distResults[dists[d]][x]);
        }
      }
    }
    stateDists = _.orderBy(stateDists,['totalVotes'],['desc']);
    console.log(stateDists);
    distChart = _.orderBy(distChart,['totalVotes','partyVotes'],['desc','desc']);

    // console.log(distChart);

    let horMargin = 0.1;
    let totHorMargin = 2*horMargin;
    let vertMargin = 0.1;
    let totVertMargin = 2*vertMargin;

    // console.log(distChart);

    function drawDistBar(votes,party,i) {
      let distCol;
      if (party === 'D') {
        distCol = sketch.color(34,106,177);
      } else if (party === 'R') {
        distCol = sketch.color(236,20,14);
      } else {
        distCol = sketch.color(200);
      }

      //y
      let barHeight = (distHght*(1-vertMargin)-distHght*vertMargin)/Object.keys(distChart).length;
      let y = (distHght*vertMargin)+(i*barHeight);

      //x
      let x = distLngth * horMargin;
      let axisMax = distChart[Object.keys(distChart)[0]][0]['totalVotes'];
      let axisDiff = (distLngth * (1-totHorMargin));
      let barIncrease = axisDiff/axisMax;
      let barWidth = votes * barIncrease;

      // sketch.stroke(distCol);
      // sketch.fill(distCol);
      // sketch.rect(x,y,barWidth,barHeight);
      // console.log(axisMax);
      // console.log(axisDiff);
      // console.log(distLngth);
      // console.log(barIncrease * axisMax);
    }

    for (let d=0;d<Object.keys(distChart).length;d++) {
      for (let r=0;r<distChart[Object.keys(distChart)[d]].length;r++) {
        // drawDistBar(distChart[Object.keys(distChart)[d]][r]['partyVotes'],distChart[Object.keys(distChart)[d]][r]['party'],d);
        // console.log(distChart[Object.keys(distChart)[d]][r]['partyVotes']);
        // console.log(distChart[Object.keys(distChart)[d]][r]['party']);
      }
      // console.log(distChart[Object.keys(distChart)[d]].length);
    }

  }
}

var myp5 = new p5(distChart,'dist-chart');
