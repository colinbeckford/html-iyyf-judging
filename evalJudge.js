function loadEvalTable(numPlayers) {
  if (roundType == "final")
  {
  for (var i=0;i<numPlayers;i++)
  {
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"control </input>" + '</td><td>' + "<input id="+i+"execution </input>" + '</td><td>' + "<input id="+i+"variation </input>" + '</td><td>' + "<input id="+i+"space-use </input>" + '</td><td>' + "<input id="+i+"showmanship </input>" + '</td><td>' + "<input id="+i+"body-control </input>" + '</td><td>' + "<input id="+i+"choreography </input>" + '</td><td>' + "<input id="+i+"construction </input>" + '</td></tr>';
    $('#eval-final-table').append(evalRow);
  }
  }
  else if (roundType == "qualifying")
  {
  for (var i=0;i<numPlayers;i++)
  {
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"control </input>" + '</td><td>' + "<input id="+i+"execution </input>" + '</td><td>' + "<input id="+i+"body-control </input>" + '</td><td>' + "<input id="+i+"choreography </input>" + '</td></tr>';
    $('#eval-qualifying-table').append(evalRow);
  }
  }
}

function updateEvalEntry(numPlayers) {
  for (var i=0;i<numPlayers;i++)
  {
    if (roundType == "final")
    {
    controlList[i] = $('#'+i+"control").val();
    executionList[i] = $('#'+i+"execution").val();
    variationList[i] =  $('#'+i+"variation").val();
    spaceUseList[i] =  $('#'+i+"space-use").val();
    showmanshipList[i] =  $('#'+i+"showmanship").val();
    bodyControlList[i] =  $('#'+i+"body-control").val();
    choreographyList[i] =  $('#'+i+"choreography").val();
    constructionList[i] =  $('#'+i+"construction").val();
    }
    else if (roundType == "qualifying")
    {
    controlList[i] = $('#'+i+"control").val();
    executionList[i] = $('#'+i+"execution").val();
    bodyControlList[i] =  $('#'+i+"body-control").val();
    choreographyList[i] =  $('#'+i+"choreography").val();
    }
  }
}

function storeEval() {
  if (roundType == "final")
  {
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
  }
  else if (roundType == "qualifying")
  {
  controlList.push(parseInt($('#control').val()));
  executionList.push(parseInt($('#execution').val()));
  bodyControlList.push(parseInt($('#body-control').val()));
  choreographyList.push(parseInt($('#choreography').val()));
  var currentEvalPlayer = "";
  currentEvalPlayer = playerList[index];
  var ctrl = $('#control').val();
  var exec = $('#execution').val();
  var bdcn = $('#body-control').val();
  var chor = $('#choreography').val();
  liveEvals.push({currentEvalPlayer, ctrl, exec, bdcn, chor});
  currentEvalPlayer = "";
  ctrl = 0;
  exec = 0;
  bdcn = 0;
  chor = 0;
  }
  evalDisplay(index);
  if (index < (players.length)-1)
  {
    index += 1;
    $('#eval-player-name').text(players[index]);
    if (roundType == "final")
    {
      $('#control').val("");
      $('#execution').val("");
      $('#variation').val("");
      $('#space-use').val("");
      $('#choreography').val("");
      $('#construction').val("");
      $('#body-control').val("");
      $('#showmanship').val("");
    }
    else if (roundType == "qualifying")
    {
      $('#control').val("");
      $('#execution').val("");
      $('#choreography').val("");
      $('#body-control').val("");
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
  $('#'+i+"control").val(liveEvals[i].ctrl);
  $('#'+i+"execution").val(liveEvals[i].exec);
  $('#'+i+"variation").val(liveEvals[i].vari);
  $('#'+i+"space-use").val(liveEvals[i].spcu);
  $('#'+i+"choreography").val(liveEvals[i].chor);
  $('#'+i+"construction").val(liveEvals[i].cons);
  $('#'+i+"body-control").val(liveEvals[i].bdcn);
  $('#'+i+"showmanship").val(liveEvals[i].shwm);
  }
  else if (roundType == "qualifying")
  {
  $('#'+i+"control").val(liveEvals[i].ctrl);
  $('#'+i+"execution").val(liveEvals[i].exec);
  $('#'+i+"choreography").val(liveEvals[i].chor);
  $('#'+i+"body-control").val(liveEvals[i].bdcn);
  }

}

function appendEval(range, round) {
  var evalinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
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
