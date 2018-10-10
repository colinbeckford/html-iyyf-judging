var numClickPlayers = 0;

function loadClickTable(num) {
  for (var i=0;i<num;i++)
  {
    numClickPlayers+=1;
    var clickRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"positive </input>" + '</td><td>' + "<input id="+i+"negative </input>" + '</td><td>' + "<input id="+i+"restart </input>" + '</td><td>' + "<input id="+i+"discard </input>" + '</td><td>' + "<input id=" + i + "detach </input>" + "</td><td> <button id=" + i + "edit onclick=updateClickEntry(" + i + ")> Edit </button> </td></tr>";
    $('#click-table').append(clickRow);
  }
}

function updateClickEntry(i) {
    positives[i] = $('#'+i+"positive").val();
    negatives[i] = $('#'+i+"negative").val();
    restarts[i] =  $('#'+i+"restart").val();
    discards[i] =  $('#'+i+"discard").val();
    detaches[i] =  $('#'+i+"detach").val();
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
  if (index <= (players.length))
  {
    setTimeout(appendClick,500);
    setTimeout(appendMajor,500);
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
    appendClick();
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
  };
  var clickinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [positives, negatives],
  };
  var clickRequest = gapi.client.sheets.spreadsheets.values.update(clickinputParams, clickinputRangeBody);
  clickRequest.then(function(response) {
    alert("Clicks have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
  if (index == (numClickPlayers))
  {
  $('#finish-click').show();
  }
}

function appendMajor()
{
  var majorinputParams = {
    spreadsheetId: spreadsheetId,
    range: "RAW-TEx!C4:E104",
    valueInputOption: "RAW",
  };
  var majorinputRangeBody = {
    "range": "RAW-TEx!C4:E104",
    "majorDimension": "COLUMNS",
    "values": [restarts,
    discards, detaches],
  };
  var majorRequest = gapi.client.sheets.spreadsheets.values.update(majorinputParams, majorinputRangeBody);
  majorRequest.then(function(response) {
    alert("Major deducts have been entered into the spreadsheet.");
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error.");
  });
}
