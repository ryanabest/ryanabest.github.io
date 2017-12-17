var rawDistData;
var stateDists = [];

$.getJSON("assets/distResults.json", loadDistJson);

function loadDistJson(json) {
  rawDistData = json;
  pushDists(json);
  drawDists();
}

function pushDists(distResults) {
  stateDists = [];
  var dists = Object.keys(distResults);

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
      }
    }
  }
  stateDists = _.orderBy(stateDists,['totalVotes'],['desc']);
}

function drawDists() {
  var oneBlock = 5000;
  for (let d=0;d<stateDists.length;d++) {
    // console.log(stateDists[d]);
    let distDivID = stateDists[d]['dist'];
    let distDivClass = 'dist-div';
    let distDiv = $('<div></div>',{id:distDivID,"class":distDivClass})
    $('#dist-chart').append(distDiv);

    let distMarginDivID = stateDists[d]['dist'] + '-margin';
    let distMarginDivClass = 'dist-margin';
    let distMarginDiv = $('<div></div>',{id:distMarginDivID,"class":distMarginDivClass});
    $('#' + distDivID).append(distMarginDiv);

    let distLabelDivID = stateDists[d]['dist'] + '-label';
    let distLabelDivClass = 'dist-label';
    let distLabelDiv = $('<div></div>',{id:distLabelDivID,"class":distLabelDivClass});
    $('#' + distDivID).append(distLabelDiv);
    $('#' + distLabelDivID).append('<p>' + stateDists[d]['dist'] + '</p>');

    if (stateDists[d]['winningParty'] === 'R') {
      if (stateDists[d]['votesToWin']<stateDists[d]['rVotes']) {
        for (let a=0;a<Math.ceil(stateDists[d]['votesToWin']/oneBlock);a++) {
          let distResultDivClass = 'r-vote-under';
          let distResultDivID = 'r-vote-under-' + a;
          let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
          $('#' + distDivID).append(distResultDiv);
        }
      } else {
        for (let a=0;a<Math.ceil(stateDists[d]['rVotes']/oneBlock);a++) {
          let distResultDivClass = 'r-vote-under';
          let distResultDivID = 'r-vote-under-' + a;
          let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
          $('#' + distDivID).append(distResultDiv);
        }
      }
      for (let a=0;a<(Math.ceil((stateDists[d]['rVotes']/oneBlock)-(stateDists[d]['votesToWin']/oneBlock)));a++) {
        let distResultDivClass = 'r-vote-over';
        let distResultDivID = 'r-vote-over-' + a;
        let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
        $('#' + distDivID).append(distResultDiv);
      }
      for (let a=0;a<Math.ceil(stateDists[d]['dVotes'])/oneBlock;a++) {
        let distResultDivClass = 'd-vote-over';
        let distResultDivID = 'd-vote-over-' + a;
        let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
        $('#' + distDivID).append(distResultDiv);
      }
      for (let a=0;a<Math.ceil(stateDists[d]['oVotes'])/oneBlock;a++) {
        let distResultDivClass = 'o-vote-over';
        let distResultDivID = 'o-vote-over-' + a;
        let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
        $('#' + distDivID).append(distResultDiv);
      }
    } else if (stateDists[d]['winningParty'] === 'D') {
      if (stateDists[d]['votesToWin']<stateDists[d]['dVotes']) {
        for (let a=0;a<Math.ceil(stateDists[d]['votesToWin']/oneBlock);a++) {
          let distResultDivClass = 'd-vote-under';
          let distResultDivID = 'd-vote-under-' + a;
          let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
          $('#' + distDivID).append(distResultDiv);
        }
      } else {
        for (let a=0;a<Math.ceil(stateDists[d]['dVotes']/oneBlock);a++) {
          let distResultDivClass = 'd-vote-under';
          let distResultDivID = 'd-vote-under-' + a;
          let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
          $('#' + distDivID).append(distResultDiv);
        }
      }
      for (let a=0;a<(Math.ceil((stateDists[d]['dVotes']/oneBlock)-(stateDists[d]['votesToWin']/oneBlock)));a++) {
        let distResultDivClass = 'd-vote-over';
        let distResultDivID = 'd-vote-over-' + a;
        let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
        $('#' + distDivID).append(distResultDiv);
      }
      for (let a=0;a<Math.ceil(stateDists[d]['rVotes'])/oneBlock;a++) {
        let distResultDivClass = 'r-vote-over';
        let distResultDivID = 'r-vote-pver-' + a;
        let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
        $('#' + distDivID).append(distResultDiv);
      }
      for (let a=0;a<Math.ceil(stateDists[d]['oVotes'])/oneBlock;a++) {
        let distResultDivClass = 'o-vote-over';
        let distResultDivID = 'o-vote-over-' + a;
        let distResultDiv = $('<div></div>',{id:distResultDivID,"class":distResultDivClass});
        $('#' + distDivID).append(distResultDiv);
      }
    }
  }
}
