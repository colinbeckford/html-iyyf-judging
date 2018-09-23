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
  index += 1;
  if (index <= (players.length))
  {
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
