function loadEvalTable(numPlayers) {
  for (var i=0;i<numPlayers;i++)
  {
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"control </input>" + '</td><td>' + "<input id="+i+"execution </input>" + '</td><td>' + "<input id="+i+"variation </input>" + '</td><td>' + "<input id="+i+"space-use </input>" + '</td><td>' + "<input id="+i+"showmanship </input>" + '</td><td>' + "<input id="+i+"body-control </input>" + '</td><td>' + "<input id="+i+"choreography </input>" + '</td><td>' + "<input id="+i+"construction </input>" + '</td><td> <button id=" + i + "edit Edit </button></td></tr>';
    $('#eval-table').append(evalRow);
  }
}


function storeEval() {
  controlList.push(parseInt($('#control').val()));
  executionList.push(parseInt($('#execution').val()));
  variationList.push(parseInt($('#variation').val()));
  spaceUseList.push(parseInt($('#space-use').val()));
  showmanshipList.push(parseInt($('#showmanship').val()));
  bodyControlList.push(parseInt($('#body-control').val()));
  choreographyList.push(parseInt($('#choreography').val()));
  constructionList.push(parseInt($('#construction').val()));
  var currentEvalPlayer = "";
  currentEvalPlayer = playerList[index];
  var ctrl = $('#control').val();
  var exec = $('#execution').val();
  var vari = $('#variation').val();
  var spcu = $('#space-use').val();
  var bdcn = $('#body-control').val();
  var shwm = $('#showmanship').val();
  var cons = $('#construction').val();
  var chor = $('#choreography').val();
  liveEvals.push({currentEvalPlayer, ctrl, exec, vari, spcu, bdcn, shwm, cons, chor});
  currentEvalPlayer = "";
  ctrl = 0;
  exec = 0;
  vari = 0;
  spcu = 0;
  bdcn = 0;
  shwm = 0;
  cons = 0;
  chor = 0;
  evalDisplay(index);
  if (index < (players.length)-1)
  {
    index += 1;
    $('#eval-player-name').text(players[index]);
    $('#control').val("");
    $('#execution').val("");
    $('#variation').val("");
    $('#space-use').val("");
    $('#choreography').val("");
    $('#construction').val("");
    $('#body-control').val("");
    $('#showmanship').val("");
  }
  else
  {
    alert("All player eval scores have been recorded.");
    appendEval(range);
  }

}

function evalDisplay(i)
{
  $('#'+i+"control").val(liveEvals[i].ctrl);
  $('#'+i+"execution").val(liveEvals[i].exec);
  $('#'+i+"variation").val(liveEvals[i].vari);
  $('#'+i+"space-use").val(liveEvals[i].spcu);
  $('#'+i+"choreography").val(liveEvals[i].chor);
  $('#'+i+"construction").val(liveEvals[i].cons);
  $('#'+i+"body-control").val(liveEvals[i].bdcn);
  $('#'+i+"showmanship").val(liveEvals[i].shwm);
}

function appendEval(range) {
  var evalinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var evalinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [executionList, controlList, variationList, spaceUseList, choreographyList, constructionList, bodyControlList, showmanshipList],
  };
  var evalRequest = gapi.client.sheets.spreadsheets.values.append(evalinputParams, evalinputRangeBody);
  evalRequest.then(function(response) {
    alert("Your evaluation scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  $("#eval-input").hide();
  $('#finish').show();
}
