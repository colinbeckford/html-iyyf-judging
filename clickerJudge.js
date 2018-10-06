
function loadClickTable(numPlayers) {
  for (var i=0;i<numPlayers;i++)
  {
    var clickRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"positive </input>" + '</td><td>' + "<input id="+i+"negative </input>" + '</td><td>' + "<input id="+i+"restart </input>" + '</td><td>' + "<input id="+i+"discard </input>" + '</td><td>' + "<input id="+i+"detach </input>" + '</td></tr>';
    $('#click-table').append(clickRow);
  }
}

function storeClick() {
  positives.push($('#positive').val());
  negatives.push($('#negative').val());
  restarts.push($('#restart').val());
  discards.push($('#discard').val());
  detaches.push($('#detach').val());
  var currentClickPlayer = playerList[index];
  var positive = $('#positive').val();
  var negative = $('#negative').val();
  var restart = $('#restart').val();
  var discard = $('#discard').val();
  var detach = $('#detach').val();
  liveClicks.push({currentClickPlayer, positive, negative, restart, discard, detach});
  clickDisplay(index);
  appendClick(range, index);
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

function clickDisplay(i)
  {
    $('#'+i+"positive").val(liveClicks[i].positive);
    $('#'+i+"negative").val(liveClicks[i].negative);
    $('#'+i+"restart").val(liveClicks[i].restart);
    $('#'+i+"discard").val(liveClicks[i].discard);
    $('#'+i+"detach").val(liveClicks[i].detach);
  }


function appendClick(range, i) {
  // var clickinputParams = {
  //   spreadsheetId: spreadsheetId,
  //   range: range,
  //   valueInputOption: "RAW",
  //   insertDataOption: "OVERWRITE",
  // };
  // var clickinputRangeBody = {
  //   "range": range,
  //   "majorDimension": "COLUMNS",
  //   "values": [positives,
  //   negatives],
  // };
  // var clickRequest = gapi.client.sheets.spreadsheets.values.append(clickinputParams, clickinputRangeBody);
  // clickRequest.then(function(response) {
  //   alert("Your clicks have been entered into the spreadsheet.");
  // }, function(reason) {
  //   console.error("error: " + reason.result.error.message);
  //   alert("Error.");
  // });
  var clickinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var clickinputRangeBody = {
    "range": range,
    "majorDimension": "ROW",
    "values": [positives[i], negative[i]],
  };
  var clickRequest = gapi.client.sheets.spreadsheets.values.append(clickinputParams, clickinputRangeBody);
  clickRequest.then(function(response) {
    alert("Your clicks have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  // $('#finish').show();
  // $("#click-input").hide();
}

function appendMajor()
{
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
    alert("Major deducts have been entered into the spreadsheet.");
    $("#click-input").hide();
    $('#finish').show();
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
}
