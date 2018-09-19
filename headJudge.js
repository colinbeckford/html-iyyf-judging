var contest_name;
var div_name;
var round;
var clicker_judges;
var eval_judges;
var players;

function enterInfo() {
  contest_name = $('#contest-name').val();
  div_name = $('#div-name').val();
  round = $('#round').val();
  clicker_judges = $('#clicker-judges').val().split('\n');
  eval_judges = $('#eval-judges').val().split('\n');
  appendInfo();
}
function appendInfo() {
  var contestParams = {
    spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",  // TODO: Update placeholder value.
    range: "SET-UP!B3:B6",
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var contestRangeBody = {
    "range": "SET-UP!B3:B6",  //Set this to cell want to add content to
    "majorDimension": "COLUMNS", //Rows or columns
    "values": [
      [contest_name,
      "",
      div_name,
      round]
    ],
  };
  var clickerjudgeParams = {
    spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",  // TODO: Update placeholder value.
    range: "SET-UP!F3:F8",
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var clickerjudgeRangeBody = {
    "range": "SET-UP!F3:F8",  //Set this to cell want to add content to
    "majorDimension": "COLUMNS", //Rows or columns
    "values": [clicker_judges],
  };
  var evaljudgeParams = {
    spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",  // TODO: Update placeholder value.
    range: "SET-UP!F16:F21",
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var evaljudgeRangeBody = {
    "range": "SET-UP!F16:F21",  //Set this to cell want to add content to
    "majorDimension": "COLUMNS", //Rows or columns
    "values": [eval_judges],
  };
  var request1 = gapi.client.sheets.spreadsheets.values.append(contestParams, contestRangeBody);
  var request2 = gapi.client.sheets.spreadsheets.values.append(clickerjudgeParams, clickerjudgeRangeBody);
  var request3 = gapi.client.sheets.spreadsheets.values.append(evaljudgeParams, evaljudgeRangeBody);
  request1.then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
  });
  request2.then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
  });
  request3.then(function(response) {
    console.log(response.result);
    $('#contest-info').hide();
    alert("Info has been entered.");
    $('#player-info').show();
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  }
  function enterPlayer() {
    players = $('#player-list').val().split('\n');
    appendPlayer();
  }
  function appendPlayer() {
    var playerParams = {
      spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",  // TODO: Update placeholder value.
      range: "PLAYER!B4:B103",
      valueInputOption: "RAW",
      insertDataOption: "OVERWRITE",
    };
    var playerRangeBody = {
      "range": "PLAYER!B4:B103",  //Set this to cell want to add content to
      "majorDimension": "COLUMNS", //Rows or columns
      "values": [players],
    };
    var request4 = gapi.client.sheets.spreadsheets.values.append(playerParams, playerRangeBody);
    request4.then(function(response) {
      console.log(response.result);
      $('#player-info').hide();
      alert("Player list has been entered.");
  });
}
