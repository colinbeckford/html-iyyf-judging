var numEvalPlayers = 0;
var currentEvalPlayer = "";
var ctrl = "";
var exec = "";
var vari = "";
var spcu = "";
var bdcn = "";
var shwm = "";
var cons = "";
var chor = "";
var evalEntered = false;

function loadEvalTable(num) {
  if (roundType == "final")
  {
  for (var i=0;i<num;i++)
  {
    numEvalPlayers+=1;
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"execution-f size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"control-f size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"variation-f size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"space-use-f size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"choreography-f size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"construction-f size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"body-control-f size="+'3'+" </input>" + '</td><td>' + "<input id="+i+"showmanship-f size="+'3'+"</input> </td><td> <button id=" + i + "edit onclick=updateEvalEntry(" + i + ")> Edit </button> </td></tr>";
    $('#eval-final-table').append(evalRow);
  }
  }
  else if (roundType == "qualifying")
  {
  for (var i=0;i<num;i++)
  {
    numEvalPlayers+=1;
    var evalRow = '<tr><td>' + playerList[i] + '</td><td>' + "<input id="+i+"execution-q size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"control-q size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"choreography-q size="+'3'+"</input>" + '</td><td>' + "<input id="+i+"body-control-q size="+'3'+"</input>" + '</td> <td> <button id=' + i + 'edit onclick=updateEvalEntry(' + i + ')> Edit </button></td></tr>';
    $('#eval-qualifying-table').append(evalRow);
  }
  }
}

function loadEvalScores() {
  var evaloutputparams = {
       spreadsheetId: spreadsheetId,
       ranges: [range],
       includeGridData: false,
     };
     var getevalrequest = gapi.client.sheets.spreadsheets.values.batchGet(evaloutputparams);
     getevalrequest.then(function(response) {
       if (response.result.valueRanges[0].hasOwnProperty('values') == true)
       {
       var evaloutput = (response.result.valueRanges[0].values);
       $('#eval-player-name-final').html(playerList[evaloutput.length]);
       $('#eval-player-name-qualifying').html(playerList[evaloutput.length]);
       for (var i=0;i<evaloutput.length;i++)
       {
         if (roundType == "final")
         {
           index+=1;
           currentEvalPlayer = playerList[i];
           ctrl = evaloutput[i][1];
           exec = evaloutput[i][0];
           vari = evaloutput[i][2];
           spcu = evaloutput[i][3];
           bdcn = evaloutput[i][6];
           shwm = evaloutput[i][7];
           cons = evaloutput[i][5];
           chor = evaloutput[i][4];
           $('#'+i+"control-f").val(ctrl);
           $('#'+i+"execution-f").val(exec);
           $('#'+i+"variation-f").val(vari);
           $('#'+i+"space-use-f").val(spcu);
           $('#'+i+"showmanship-f").val(shwm);
           $('#'+i+"body-control-f").val(cons);
           $('#'+i+"choreography-f").val(chor);
           $('#'+i+"construction-f").val(cons);
           controlList.push(ctrl);
           executionList.push(exec);
           variationList.push(vari);
           spaceUseList.push(spcu);
           showmanshipList.push(shwm);
           bodyControlList.push(bdcn);
           choreographyList.push(chor);
           constructionList.push(cons);
           liveEvals.push({currentEvalPlayer, exec, ctrl, vari, spcu, chor, cons, bdcn, shwm});
         }
         else if (roundType == "qualifying")
         {
           index+=1;
           $('#'+i+"control-q").val(evaloutput[i][1]);
           $('#'+i+"execution-q").val(evaloutput[i][0]);
           $('#'+i+"body-control-q").val(evaloutput[i][2]);
           $('#'+i+"choreography-q").val(evaloutput[i][3]);
         }
       }
     }
     else
     {
       $('#eval-player-name-final').html(playerList[0]);
       $('#eval-player-name-qualifying').html(playerList[0]);
     }
    }, function(reason) {
       console.error('error: ' + reason.result.error.message);
     });
}

function updateEvalEntry(i) {
    if (roundType == "final")
    {
    controlList[i] = parseInt($('#'+i+"control-f").val());
    executionList[i] = parseInt($('#'+i+"execution-f").val());
    variationList[i] =  parseInt($('#'+i+"variation-f").val());
    spaceUseList[i] =  parseInt($('#'+i+"space-use-f").val());
    showmanshipList[i] =  parseInt($('#'+i+"showmanship-f").val());
    bodyControlList[i] =  parseInt($('#'+i+"body-control-f").val());
    choreographyList[i] =  parseInt($('#'+i+"choreography-f").val());
    constructionList[i] =  parseInt($('#'+i+"construction-f").val());
    }
    else if (roundType == "qualifying")
    {
    controlList[i] = parseInt($('#'+i+"control-q").val());
    executionList[i] = parseInt($('#'+i+"execution-q").val());
    bodyControlList[i] =  parseInt($('#'+i+"body-control-q").val());
    choreographyList[i] =  parseInt($('#'+i+"choreography-q").val());
    }
    appendEval(roundType);
}

function storeEval() {
  if (evalEntered == false)
  {
  evalEntered == true;
  if (roundType == "final")
  {
  controlList.push(parseInt($('#control-f').val()));
  executionList.push(parseInt($('#execution-f').val()));
  variationList.push(parseInt($('#variation-f').val()));
  spaceUseList.push(parseInt($('#space-use-f').val()));
  showmanshipList.push(parseInt($('#showmanship-f').val()));
  bodyControlList.push(parseInt($('#body-control-f').val()));
  choreographyList.push(parseInt($('#choreography-f').val()));
  constructionList.push(parseInt($('#construction-f').val()));
  var currentEvalPlayer = "";
  currentEvalPlayer = playerList[index];
  ctrl = parseInt($('#control-f').val());
  exec = parseInt($('#execution-f').val());
  vari = parseInt($('#variation-f').val());
  spcu = parseInt($('#space-use-f').val());
  bdcn = parseInt($('#body-control-f').val());
  shwm = parseInt($('#showmanship-f').val());
  cons = parseInt($('#construction-f').val());
  chor = parseInt($('#choreography-f').val());
  liveEvals.push({currentEvalPlayer, exec, ctrl, vari, spcu, chor, cons, bdcn, shwm});
  $.each(liveEvals[index], function(key,value)
  {
    if (key != currentEvalPlayer)
    {
      if (value < 0 || value > 10)
      {
        alert("You have inputted a number outside of the range of 0-10. Please change this by updating the value in the table and pressing edit.");
      }
    }
  });
  }
  else if (roundType == "qualifying")
  {
  controlList.push(parseInt($('#control-q').val()));
  executionList.push(parseInt($('#execution-q').val()));
  bodyControlList.push(parseInt($('#body-control-q').val()));
  choreographyList.push(parseInt($('#choreography-q').val()));

  currentEvalPlayer = playerList[index];
  var ctrl = parseInt($('#control-q').val());
  var exec = parseInt($('#execution-q').val());
  var bdcn = parseInt($('#body-control-q').val());
  var chor = parseInt($('#choreography-q').val());
  liveEvals.push({currentEvalPlayer, exec, ctrl, chor, bdcn});
  $.each(liveEvals[index], function(key,value)
  {
    if (key != currentEvalPlayer)
    {
      if (value < 0 || value > 10)
      {
        alert("You have inputted a number outside of the range of 0-10. Please change this by updating the value in the table and pressing edit.");
      }
    }
  });
  }
  evalDisplay(index);
  if (index <= players.length)
  {
    setTimeout(appendEval(roundType),500);
    index += 1;
    $('#eval-player-name-qualifying').text(players[index]);
    $('#eval-player-name-final').text(players[index]);
    if (roundType == "final")
    {
      $('#control-f').val("");
      $('#execution-f').val("");
      $('#variation-f').val("");
      $('#space-use-f').val("");
      $('#choreography-f').val("");
      $('#construction-f').val("");
      $('#body-control-f').val("");
      $('#showmanship-f').val("");
    }
    else if (roundType == "qualifying")
    {
      $('#control-q').val("");
      $('#execution-q').val("");
      $('#choreography-q').val("");
      $('#body-control-q').val("");
    }
    evalEntered = false;
  }
  else
  {
    updateEvalEntry();
    appendEval(roundType);
  }
}
}

function evalDisplay(i)
{
  if (roundType == "final")
  {
  $('#'+i+"control-f").val(liveEvals[i].ctrl);
  $('#'+i+"execution-f").val(liveEvals[i].exec);
  $('#'+i+"variation-f").val(liveEvals[i].vari);
  $('#'+i+"space-use-f").val(liveEvals[i].spcu);
  $('#'+i+"choreography-f").val(liveEvals[i].chor);
  $('#'+i+"construction-f").val(liveEvals[i].cons);
  $('#'+i+"body-control-f").val(liveEvals[i].bdcn);
  $('#'+i+"showmanship-f").val(liveEvals[i].shwm);
  }
  else if (roundType == "qualifying")
  {
  $('#'+i+"control-q").val(liveEvals[i].ctrl);
  $('#'+i+"execution-q").val(liveEvals[i].exec);
  $('#'+i+"choreography-q").val(liveEvals[i].chor);
  $('#'+i+"body-control-q").val(liveEvals[i].bdcn);
  }

}

function appendEval(round) {
  var evalinputParams = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: "RAW",
  };
  if (round == "final")
  {
  var evalinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [executionList, controlList, variationList, spaceUseList, choreographyList, constructionList, bodyControlList, showmanshipList],
  };
  }
  else if (round == "qualifying")
  {
  var evalinputRangeBody = {
    "range": range,
    "majorDimension": "COLUMNS",
    "values": [executionList, controlList, choreographyList, bodyControlList],
  };
  }
  var evalRequest = gapi.client.sheets.spreadsheets.values.update(evalinputParams, evalinputRangeBody);
  evalRequest.then(function(response) {
  }, function(reason) {
    console.error("error: " + reason.result.error.message);
    alert("Error: " + reason.result.error.message);
  });
  if (index == (numEvalPlayers))
  {
    $('#eval-player-name-qualifying').text("");
    $('#eval-player-name-final').text("");
    $('#control-q').val("");
    $('#execution-q').val("");
    $('#choreography-q').val("");
    $('#body-control-q').val("");
    $('#control-f').val("");
    $('#execution-f').val("");
    $('#variation-f').val("");
    $('#space-use-f').val("");
    $('#choreography-f').val("");
    $('#construction-f').val("");
    $('#body-control-f').val("");
    $('#showmanship-f').val("");

    alert("You've inserted scores for all players! You may still edit past scores.");
  }

}
