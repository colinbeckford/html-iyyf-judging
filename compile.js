

function loadTech(input) {
  for (var i=0; i<input.length; i++)
  {
    techScores.push(parseFloat(input[i]));
  }
}

function loadEval(input) {
  for (var i=0; i<input.length; i++)
  {
    for (var j=0; j<8; j++)
    {
      if (j < 3)
      {
        techeval += parseFloat(input[i][j]);
      }
      else
      {
        perfeval += parseFloat(input[i][j]);
      }
    }
    techevalScores.push(techeval);
    perfevalScores.push(perfeval);
    techeval = 0;
    perfeval = 0;
  }
}

// function loadMD(input) {
//   for (var i=0; i<input.length; i++)
//   {
//     for (var j=0; j<3; j++)
//     {
//       major += Math.abs(parseInt(input[i][j]));
//     }
//
//     majorScores.push(-Math.abs(major));
//     major = 0;
//   }
// }

function getResults() {
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheet,
  range: "RESULT!H3:H50"
  }).then((response) => {
  loadTech(response.result.values);
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheet,
  range: "RESULT!I3:P50"
  }).then((response) => {
  loadEval(response.result.values);
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheet,
  range: "RESULT!S3:U50"
  }).then((response) => {
  //loadMD(response.result.values);
  //majors have not been addressed
  setupChart(techScores, techevalScores, perfevalScores);
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });
  });
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheet,
  range: "RESULT!B3:B50"
  }).then((response) => {
  order = response.result.values;
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });
}

function texComp() {
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheet,
  range: "TEx-COMP!C3:H50"
  }).then((response) => {
  var compList = response.result.values;
  console.log(compList);
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
});
}

// function loadComp(input) {
//
//
//
//
//
// }

  function setupChart(tech, te, pe) {
    Highcharts.chart('final-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Final Results'
        },
        xAxis: {
            categories: order
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Score Breakdown'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: [{
            name: 'Tech Execution',
            data: tech
        }, {
            name: 'Tech Eval',
            data: te
        }, {
            name: 'Perf Eval',
            data: pe
        }]
    });
    $('#finish').hide();
    $('#final-chart').show();
  }
