
function storeClick() {
  positives.push($('#positive').val());
  negatives.push($('#negative').val());
  var currentClickPlayer = "";
  currentClickPlayer = playerList[index];
  var positive = 0;
  positive = $('#positive').val();
  var negative = 0
  negative = $('#negative').val();
  liveClicks.push({currentClickPlayer, positive, negative});
  currentClickPlayer = "";
  positive = 0;
  negative = 0;
  clickDisplay(index);
  if (index < (players.length))
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
    console.log(liveClicks[i].currentClickPlayer);
    var scoresDisplay = "";
    scoresDisplay += liveClicks[i].currentClickPlayer + ": +" + liveClicks[i].positive + " -" + liveClicks[i].negative;
    var list = document.getElementById("click-list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(scoresDisplay));
    list.appendChild(li);
  }


function appendClick(range) {
  var clickinputParams = {
    spreadsheetId: spreadsheetId, // TODO: Update placeholder value.
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
