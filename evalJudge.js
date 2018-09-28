function storeEval() {
  console.log($('#control').val());
  controlList.push(parseInt($('#control').val()));
  executionList.push(parseInt($('#execution').val()));
  variationList.push(parseInt($('#variation').val()));
  spaceUseList.push(parseInt($('#space-use').val()));
  showmanshipList.push(parseInt($('#showmanship').val()));
  bodyControlList.push(parseInt($('#body-control').val()));
  choreographyList.push(parseInt($('#choreography').val()));
  constructionList.push(parseInt($('#construction').val()));
  var currentPlayer = "";
  currentPlayer = playerList[index];
  var ctrl = $('#control').val();
  var exec = $('#execution').val();
  var vari = $('#variation').val();
  var spcu = $('#space-use').val();
  var bdcn = $('#body-control').val();
  var shwm = $('#showmanship').val();
  var cons = $('#construction').val();
  var chor = $('#choreography').val();
  liveEvals.push({currentPlayer, ctrl, exec, vari, spcu, bdcn, shwm, cons, chor});
  currentPlayer = "";
  ctrl = 0;
  exec = 0;
  vari = 0;
  spcu = 0;
  bdcn = 0;
  shwm = 0;
  cons = 0;
  chor = 0;
  liveDisplay(index);
  if (index < (players.length))
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

function liveDisplay(i)
  {
    console.log(liveEvals[i].currentPlayer);
    var newRow = '<tr><td>' + liveEvals[i].currentPlayer + '</td><td>' + liveEvals[i].ctrl + '</td><td>' + liveEvals[i].exec + '</td><td>' + liveEvals[i].vari + '</td><td>' + liveEvals[i].spcu + '</td><td>' + liveEvals[i].bdcn + '</td><td>' + liveEvals[i].shwm + '</td><td>' + liveEvals[i].cons + '</td><td>' + liveEvals[i].chor + '</td></tr>';
    console.log(newRow);
    $('#eval-table').append(newRow);
  }

function appendEval(range) {
  var evalinputParams = {
    spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",  // TODO: Update placeholder value.
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var evalinputRangeBody = {
    "range": range,  //Set this to cell want to add content to
    "majorDimension": "COLUMNS", //Rows or columns
    "values": [executionList, controlList, variationList, spaceUseList, choreographyList, constructionList, bodyControlList, showmanshipList],
  };
  var request6 = gapi.client.sheets.spreadsheets.values.append(evalinputParams, evalinputRangeBody);
  request6.then(function(response) {
    console.log(response.result);
    alert("Scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  $('#finish').show();
  $("#click-input").hide();
}
