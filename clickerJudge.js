
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
  clickDisplay(index);
  if (index < (players.length)-1)
  {
    index+=1;
    $('#click-player-name').text(players[index]);
    $('#positive').val('');
    $('#negative').val('');
    $('#restart').val('');
    $('#discard').val('');
    $('#detach').val('');
  }
  else
  {
    alert("All player click scores have been recorded.");
    appendClick(range);
    appendMajor();
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
    var clickRow = '<tr><td>' + liveClicks[i].currentClickPlayer + '</td><td>' + liveClicks[i].positive + '</td><td>' + liveClicks[i].negative + '</td><td>' + liveClicks[i].restart + '</td><td>' + liveClicks[i].discard + '</td><td>' + liveClicks[i].detach + '</td></tr>';
    $('#click-table').append(clickRow);
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
  var clickRequest = gapi.client.sheets.spreadsheets.values.append(clickinputParams, clickinputRangeBody);
  clickRequest.then(function(response) {
    alert("Scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  $('#finish').show();
  $("#click-input").hide();
}

function appendMajor()
{
  console.log("Function appendmajor is being called");
  console.log(restarts);
  console.log(discards);
  console.log(detaches);
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
  var majorRequest = gapi.client.sheets.spreadsheets.values.append(majorinputParams, majorinputRangeBody);
  majorRequest.then(function(response) {
    alert("Scores have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
}
