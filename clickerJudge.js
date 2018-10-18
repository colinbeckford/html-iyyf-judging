var numClickPlayers = 0;
var currentClickPlayer = "";
var clickEntered = false;
function loadClickTable(num) {
  for (var i=0;i<num;i++)
  {
    numClickPlayers+=1;
    var clickRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"positive size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"negative size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"restart size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"discard size="+'3'+"</input>" + '</td><td>' + "<input id=" + i + "detach size="+'3'+"</input>" + "</td><td> <button id=" + i + "edit onclick=updateClickEntry(" + i + ")> Edit </button> </td></tr>";
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
       if (response.result.valueRanges[0].hasOwnProperty('values') == true)
       {
       var clickoutput = (response.result.valueRanges[0].values);
       var majoroutput = (response.result.valueRanges[1].values);
       $('#click-player-name').html(playerList[clickoutput.length]);
       for (var i=0;i<clickoutput.length;i++)
       {
         index+=1;
         var pos = parseInt(clickoutput[i][0]);
         var neg = parseInt(clickoutput[i][1]);
         var res = parseInt(majoroutput[i][0]);
         var dis = parseInt(majoroutput[i][1]);
         var det = parseInt(majoroutput[i][2]);
         currentClickPlayer = playerList[i];
         $('#'+i+"positive").val(pos);
         $('#'+i+"negative").val(neg);
         $('#'+i+"restart").val(res);
         $('#'+i+"discard").val(dis);
         $('#'+i+"detach").val(det);
         positives.push(pos);
         negatives.push(neg);
         restarts.push(res);
         discards.push(dis);
         detaches.push(det);
         liveClicks.push({currentClickPlayer, pos, neg, res, dis, det});
         for (prop in liveClicks)
         {
           if (typeof prop == "string")
           {
             continue;
           }
           else if (prop<0)
           {
             alert("You have input a value that is out of range of scoring (negative number).");
           }
         }
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
    positives[i] = parseInt($('#'+i+"positive").val());
    negatives[i] = parseInt($('#'+i+"negative").val());
    restarts[i] =  parseInt($('#'+i+"restart").val());
    discards[i] =  parseInt($('#'+i+"discard").val());
    detaches[i] =  parseInt($('#'+i+"detach").val());
    setTimeout(appendClick,500);
    setTimeout(appendMajor,500);
}

function storeClick(i) {
  if (clickEntered == false)
  {
  clickEntered == true;
  positives[i] = parseInt(($('#positive').val()));
  negatives[i] = parseInt(($('#negative').val()));
  restarts[i] = parseInt(($('#restart').val()));
  discards[i] = parseInt(($('#discard').val()));
  detaches[i] = parseInt(($('#detach').val()));
  currentClickPlayer = playerList[index];
  var positive = parseInt($('#positive').val());
  var negative = parseInt($('#negative').val());
  var restart = parseInt($('#restart').val());
  var discard = parseInt($('#discard').val());
  var detach = parseInt($('#detach').val());
  liveClicks.push({currentClickPlayer, positive, negative, restart, discard, detach});
  $.each(liveClicks[index], function(key,value)
  {
    if (key != currentClickPlayer)
    {
      if (value < 0)
      {
        alert("You have inputted a negative number. Please change this by updating the value in the table and pressing edit.");
      }
    }
  });
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
    clickEntered = false;
  }
  else
  {
    appendClick();
    appendMajor();
  }
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
    $('#click-input').hide();
    alert("You've inserted scores for all players! You may still edit past scores.");
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
