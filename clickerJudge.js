
function storeClick() {
  positives.push($('#positive').val());
  negatives.push($('#negative').val());
  var currentPlayer = playerList[index];
  var positive = $('#positive').val();
  var negative = $('#negative').val();
  liveScores.push({currentPlayer, positive, negative});
  liveScores.sort(compare);
  liveDisplay(liveScores);

  index += 1;
  if (index < (players.length))
  {
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

function liveDisplay(list)
  {
    var scoresDisplay = "";
    for (var i=0; i<list.length; i++)
    {
      scoresDisplay += liveScores[i].currentPlayer + ": +" + liveScores[i].positive + " -" + liveScores[i].negative;
      var list = document.getElementById("rank-list");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(scoresDisplay));
      list.appendChild(li);
    }
  }


function appendClick(range) {
  var clickinputParams = {
    spreadsheetId: spreadsheet, // TODO: Update placeholder value.
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
  $('#finish').show();
  $("#click-input").hide();


}
