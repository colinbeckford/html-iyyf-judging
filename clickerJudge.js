var currentRange = "";

function loadClickTable(numPlayers) {
  for (var i=0;i<numPlayers;i++)
  {
    var clickRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"positive </input>" + '</td><td>' + "<input id="+i+"negative </input>" + '</td><td>' + "<input id="+i+"restart </input>" + '</td><td>' + "<input id="+i+"discard </input>" + '</td><td>' + "<input id=" + i + "detach </input>" + "</td><td> <button id=" + i + "edit> Edit </button> </td></tr>";
    $('#click-table').append(clickRow);
  }
}

function updateClickEntry(numPlayers) {
  for (var i=0;i<numPlayers;i++)
  {
    positives[i] = $('#'+i+"positive").val();
    negatives[i] = $('#'+i+"negative").val();
    restarts[i] =  $('#'+i+"restart").val();
    discards[i] =  $('#'+i+"discard").val();
    detaches[i] =  $('#'+i+"detach").val();
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
  if (index < (players.length)-1)
  {
    appendClick();
    appendMajor();
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
    updateClickEntry(numPlayers);
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

function appendClick() {
  var clickinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var clickinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [positives, negatives],
  };
  var clickRequest = gapi.client.sheets.spreadsheets.values.update(clickinputParams, clickinputRangeBody);
  clickRequest.then(function(response) {
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  if (index == (numPlayers-1))
  {
  $('#finish').show();
  $("#click-input").hide();
  }
}

function appendMajor()
{
  var majorinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
    insertDataOption: "OVERWRITE",
  };
  var majorinputRangeBody = {
    "range": range,
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
