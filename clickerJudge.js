var numClickPlayers = 0;

function loadClickTable(num) {
  for (var i=0;i<num;i++)
  {
    numClickPlayers+=1;
    var clickRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"positive </input>" + '</td><td>' + "<input id="+i+"negative </input>" + '</td><td>' + "<input id="+i+"restart </input>" + '</td><td>' + "<input id="+i+"discard </input>" + '</td><td>' + "<input id=" + i + "detach </input>" + "</td><td> <button id=" + i + "edit onclick=updateClickEntry(" + i + ")> Edit </button> </td></tr>";
    $('#click-table').append(clickRow);
  }
}

function loadClickScores() {
  var clickoutputparams = {
       spreadsheetId: spreadsheetId,
       ranges: [range, "RAW-TEx!C4:E104"],
       valueRenderOption: 'FORMATTED_VALUE',
       dateTimeRenderOption: 'FORMATTED_STRING',
     };
     var getclickrequest = gapi.client.sheets.spreadsheets.values.batchGet(clickoutputparams);
     getclickrequest.then(function(response)
     {
       if (jQuery.isEmptyObject(response) == false)
       {
       var clickoutput = (response.result.valueRanges[0].values);
       var majoroutput = (response.result.valueRanges[1].values);
       $('#click-player-name').html(playerList[clickoutput.length]);
       for (var i=0;i<clickoutput.length;i++)
       {
         index+=1;
         var pos = clickoutput[i][0];
         var neg = clickoutput[i][1];
         var res = majoroutput[i][0];
         var dis = majoroutput[i][1];
         var det = majoroutput[i][2];
         var currentPlayer = playerList[i];
         $('#'+i+"positive").val(clickoutput[i][0]);
         $('#'+i+"negative").val(clickoutput[i][1]);
         $('#'+i+"restart").val(majoroutput[i][0]);
         $('#'+i+"discard").val(majoroutput[i][1]);
         $('#'+i+"detach").val(majoroutput[i][2]);
         positives.push(clickoutput[i][0]);
         negatives.push(clickoutput[i][1]);
         restarts.push(majoroutput[i][0]);
         discards.push(majoroutput[i][1]);
         detaches.push(majoroutput[i][2]);
         liveClicks.push({currentPlayer, pos, neg, res, dis, det});
       }
     }
     else
     {
       $('#click-player-name').html(playerList[0]);
     }

     }, function(reason) {
       console.error('error: ' + reason.result.error.message);
     });
}

function updateClickEntry(i) {
    positives[i] = $('#'+i+"positive").val();
    negatives[i] = $('#'+i+"negative").val();
    restarts[i] =  $('#'+i+"restart").val();
    discards[i] =  $('#'+i+"discard").val();
    detaches[i] =  $('#'+i+"detach").val();
    setTimeout(appendClick,500);
    setTimeout(appendMajor,500);
}

function storeClick(i) {
  positives[i] = ($('#positive').val());
  negatives[i] = ($('#negative').val());
  restarts[i] = ($('#restart').val());
  discards[i] = ($('#discard').val());
  detaches[i] = ($('#detach').val());
  var currentClickPlayer = playerList[index];
  var positive = $('#positive').val();
  var negative = $('#negative').val();
  var restart = $('#restart').val();
  var discard = $('#discard').val();
  var detach = $('#detach').val();
  liveClicks.push({currentClickPlayer, positive, negative, restart, discard, detach});
  clickDisplay(i);
  if (i <= (players.length))
  {
    setTimeout(appendClick,500);
    setTimeout(appendMajor,500);
    index+=1;
    $('#click-player-name').text(playerList[index]);
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
    console.log(positives);
    console.log(negatives);
    console.log(restarts);
    console.log(discards);
    console.log(detaches);
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
