var numEvalPlayers;

function loadEvalTable(numPlayers) {
  if (roundType == "final")
  {
  for (var i=0;i<numPlayers;i++)
  {
    numEvalPlayers+=1;
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"control-f </input>" + '</td><td>' + "<input id="+i+"execution-f </input>" + '</td><td>' + "<input id="+i+"variation-f </input>" + '</td><td>' + "<input id="+i+"space-use-f </input>" + '</td><td>' + "<input id="+i+"showmanship-f </input>" + '</td><td>' + "<input id="+i+"body-control-f </input>" + '</td><td>' + "<input id="+i+"choreography-f </input>" + '</td><td>' + "<input id="+i+"construction-f </input> </td><td> <button id=" + i + "edit onclick=updateEvalEntry(" + i + ")> Edit </button> </td></tr>";
    $('#eval-final-table').append(evalRow);
  }
  }
  else if (roundType == "qualifying")
  {
  for (var i=0;i<numPlayers;i++)
  {
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"control-q </input>" + '</td><td>' + "<input id="+i+"execution-q </input>" + '</td><td>' + "<input id="+i+"body-control-q </input>" + '</td><td>' + "<input id="+i+"choreography-q </input>" + '</td></tr>';
    $('#eval-qualifying-table').append(evalRow);
  }
  }
}

function updateEvalEntry(i) {
    if (roundType == "final")
    {
    controlList[i] = $('#'+i+"control-f").val();
    executionList[i] = $('#'+i+"execution-f").val();
    variationList[i] =  $('#'+i+"variation-f").val();
    spaceUseList[i] =  $('#'+i+"space-use-f").val();
    showmanshipList[i] =  $('#'+i+"showmanship-f").val();
    bodyControlList[i] =  $('#'+i+"body-control-f").val();
    choreographyList[i] =  $('#'+i+"choreography-f").val();
    constructionList[i] =  $('#'+i+"construction-f").val();
    }
    else if (roundType == "qualifying")
    {
    controlList[i] = $('#'+i+"control-q").val();
    executionList[i] = $('#'+i+"execution-q").val();
    bodyControlList[i] =  $('#'+i+"body-control-q").val();
    choreographyList[i] =  $('#'+i+"choreography-q").val();
    }
}

function storeEval() {
  if (roundType == "final")
  {
  controlList.push(parseInt($('#control-f').val()));
  executionList.push(parseInt($('#execution-f').val()));
  variationList.push(parseInt($('#variation-f').val()));
  spaceUseList.push(parseInt($('#space-use-f').val()));
  showmanshipList.push(parseInt($('#showmanship-f').val()));
  bodyControlList.push(parseInt($('#body-control-f').val()));
  choreographyList.push(parseInt($('#choreography-f').val()));
  constructionList.push(parseInt($('#construction-f').val()));
  var currentEvalPlayer = "";
  currentEvalPlayer = playerList[index];
  var ctrl = $('#control-f').val();
  var exec = $('#execution-f').val();
  var vari = $('#variation-f').val();
  var spcu = $('#space-use-f').val();
  var bdcn = $('#body-control-f').val();
  var shwm = $('#showmanship-f').val();
  var cons = $('#construction-f').val();
  var chor = $('#choreography-f').val();
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
  }
  else if (roundType == "qualifying")
  {
  controlList.push(parseInt($('#control-q').val()));
  executionList.push(parseInt($('#execution-q').val()));
  bodyControlList.push(parseInt($('#body-control-q').val()));
  choreographyList.push(parseInt($('#choreography-q').val()));
  var currentEvalPlayer = "";
  currentEvalPlayer = playerList[index];
  var ctrl = $('#control-q').val();
  var exec = $('#execution-q').val();
  var bdcn = $('#body-control-q').val();
  var chor = $('#choreography-q').val();
  liveEvals.push({currentEvalPlayer, ctrl, exec, bdcn, chor});
  currentEvalPlayer = "";
  ctrl = 0;
  exec = 0;
  bdcn = 0;
  chor = 0;
  }
  evalDisplay(index);
  if (index <= players.length)
  {
    setTimeout(appendEval(range,roundType),500);
    index += 1;
    $('#eval-player-name-qualifying').text(players[index]);
    $('#eval-player-name-final').text(players[index]);
    if (roundType == "final")
    {
      $('#control-f').val("");
      $('#execution-f').val("");
      $('#variation-f').val("");
      $('#space-use-f').val("");
      $('#choreography-f').val("");
      $('#construction-f').val("");
      $('#body-control-f').val("");
      $('#showmanship-f').val("");
    }
    else if (roundType == "qualifying")
    {
      $('#control-q').val("");
      $('#execution-q').val("");
      $('#choreography-q').val("");
      $('#body-control-q').val("");
    }
  }
  else
  {
    alert("All player eval scores have been recorded.");
    updateEvalEntry();
    appendEval(range, roundType);
  }

}

function evalDisplay(i)
{
  if (roundType == "final")
  {
  $('#'+i+"control-f").val(liveEvals[i].ctrl);
  $('#'+i+"execution-f").val(liveEvals[i].exec);
  $('#'+i+"variation-f").val(liveEvals[i].vari);
  $('#'+i+"space-use-f").val(liveEvals[i].spcu);
  $('#'+i+"choreography-f").val(liveEvals[i].chor);
  $('#'+i+"construction-f").val(liveEvals[i].cons);
  $('#'+i+"body-control-f").val(liveEvals[i].bdcn);
  $('#'+i+"showmanship-f").val(liveEvals[i].shwm);
  }
  else if (roundType == "qualifying")
  {
  $('#'+i+"control-q").val(liveEvals[i].ctrl);
  $('#'+i+"execution-q").val(liveEvals[i].exec);
  $('#'+i+"choreography-q").val(liveEvals[i].chor);
  $('#'+i+"body-control-q").val(liveEvals[i].bdcn);
  }

}

function appendEval(round, range) {
  var evalinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
  };
  if (round == "final")
  {
  var evalinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [executionList, controlList, variationList, spaceUseList, choreographyList, constructionList, bodyControlList, showmanshipList],
  };
  }
  if (round == "qualifying")
  {
  var evalinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [executionList, controlList, choreographyList, bodyControlList],
  };
  }
  var evalRequest = gapi.client.sheets.spreadsheets.values.update(evalinputParams, evalinputRangeBody);
  evalRequest.then(function(response) {
    alert("Your evaluation scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  $("#eval-input").hide();
  $('#finish').show();
}
