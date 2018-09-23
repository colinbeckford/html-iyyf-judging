var index = 0;
var players;

function storeClick() {
  positives.push($('#positive').val());
  negatives.push($('#negative').val());
  index += 1;
  if (index < (players.length))
  {
    $('#click-player-name').text(players[index]);
    $('#positive').val('0');
    $('#negative').val('0');
  }
  else
  {
    alert("All player click scores have been recorded.");
    appendClick(range);
  }
}

function appendClick(range) {
  var clickinputParams = {
    spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",  // TODO: Update placeholder value.
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var clickinputRangeBody = {
    "range": range,  //Set this to cell want to add content to
    "majorDimension": "COLUMNS", //Rows or columns
    "values": [positives,
    negatives],
  };
  var request5 = gapi.client.sheets.spreadsheets.values.append(clickinputParams, clickinputRangeBody);
  request5.then(function(response) {
    console.log(response.result);
    alert("Scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
}
