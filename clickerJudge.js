
function storeClick() {
  positives.push($('#positive').val());
  negatives.push($('#negative').val());
  restarts.push($('#restarts').val());
  discards.push($('#discards').val());
  detaches.push($('#detaches').val());
  var currentClickPlayer = "";
  currentClickPlayer = playerList[index];
  var positive = 0;
  positive = $('#positive').val();
  var negative = 0
  negative = $('#negative').val();
  var restart = 0
  restart = $('#restart').val();
  var discard = 0
  discard = $('#discard').val();
  var detach = 0
  detach = $('#detach').val();
  liveClicks.push({currentClickPlayer, positive, negative, restart, discard, detach});
  currentClickPlayer = "";
  positive = 0;
  negative = 0;
  clickDisplay(index);
  if (index < (players.length)-1)
  {
    index+=1;
    $('#click-player-name').text(players[index]);
    $('#positive').val('');
    $('#negative').val('');
  }
  else
  {
    alert("All player click scores have been recorded.");
    appendClick(range);
  }
}

function compare(a, b) {
  const scoreA = a.positive-a.negative;
  const scoreB = b.positive-b.negative;
  let comparison = 0;
  if (scoreA > scoreB)
  {
    comparison = 1;
  }
  else if (scoreA < scoreB)
  {
    comparison = -1;
  }
    return comparison * -1;
  }

function clickDisplay(i)
  {
    var newRow = '<tr><td>' + liveClicks[i].currentClickPlayer + '</td><td>' + liveClicks[i].positive + '</td><td>' + liveEvals[i].negative + '</td><td>' + liveEvals[i].restart + '</td><td>' + liveEvals[i].discard + '</td><td>' + liveEvals[i].detach + '</td></tr>';
    $('#click-table').append(newRow);
  }


function appendClick(range) {
  var clickinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var clickinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [positives,
    negatives],
  };
  var request5 = gapi.client.sheets.spreadsheets.values.append(clickinputParams, clickinputRangeBody);
  request5.then(function(response) {
    alert("Scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  var majorinputParams = {
    spreadsheetId: spreadsheetId,
    range: "RAW-TEx!C4:E105",
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var majorinputRangeBody = {
    "range": "RAW-TEx!C4:E105",
    "majorDimension": "COLUMNS",
    "values": [restarts,
    discards, detaches],
  };
  var request6 = gapi.client.sheets.spreadsheets.values.append(majorinputParams, majorinputRangeBody);
  request6.then(function(response) {
    alert("Scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  $('#finish').show();
  $("#click-input").hide();


}
