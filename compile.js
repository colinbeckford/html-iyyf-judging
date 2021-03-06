

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
    techevalScores.push(parseInt(techeval));
    perfevalScores.push(parseInt(perfeval));
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
//     majorScores.push(parseInt(-Math.abs(major));
//     major = 0;
//   }
// }

function getResults() {
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheetId,
  range: "RESULT!H3:H50"
  }).then((response) => {
  loadTech(response.result.values);
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheetId,
  range: "RESULT!I3:P50"
  }).then((response) => {
  loadEval(response.result.values);
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheetId,
  range: "RESULT!S3:U50"
  }).then((response) => {
  //loadMD(response.result.values);
  //majors have not been addressed
  setupResultChart(techScores, techevalScores, perfevalScores);
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
  spreadsheetId: spreadsheetId,
  range: "RESULT!B3:B50"
  }).then((response) => {
  results_order = response.result.values;
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });

}

function texComp() {
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheetId,
  range: "RESULT!B3:B50"
  }).then((response) => {
  results_order = response.result.values;
  console.log(results_order);
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: spreadsheetId,
  range: "TEx-COMP!C3:H50"
  }).then((response) => {
  loadComp(response.result.values);
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
});
}

function loadComp(input) {
  var spaceOne = 0;
  var spaceTwo = 1;
  var spaceThree = 2;
  var spaceFour = 3;
  var spaceFive = 4;
  var spaceSix = 5;
  for (var i=0;i<input.length;i++)
  {
    for (var j=0;j<input[i].length;j++)
    {
      input[i][j] = parseInt(input[i][j]);
    }
  }
  if (clicker_judges.length == 1)
  {
    for (var a=0;a<input.length;a++)
    {
      oneJ.push(parseInt(input[a][spaceOne]));
    }
  }
  else if (clicker_judges.length == 2)
  {
    for (var a=0;a<input.length;a++)
    {
      oneJ.push(parseInt((input[a][spaceOne])/2));
      twoJ.push(parseInt((input[a][spaceTwo])/2));
    }
  }
  else if (clicker_judges.length == 3)
  {
    for (var a=0;a<input.length;a++)
    {
      oneJ.push(parseInt((input[a][spaceOne])/3));
      twoJ.push(parseInt((input[a][spaceTwo])/3))
      threeJ.push(parseInt((input[a][spaceThree])/3));
    }
  }
  else if (clicker_judges.length == 4)
  {
    for (var a=0;a<input.length;a++)
    {
      oneJ.push(parseInt((input[a][spaceOne])/4));
      twoJ.push(parseInt((input[a][spaceTwo])/4));
      threeJ.push(parseInt((input[a][spaceThree])/4));
      fourJ.push(parseInt((input[a][spaceFour])/4));
    }
  }
  else if (clicker_judges.length == 5)
  {
    for (var a=0;a<input.length;a++)
    {
      oneJ.push(parseInt((input[a][spaceOne])/5));
      twoJ.push(parseInt((input[a][spaceTwo])/5));
      threeJ.push(parseInt((input[a][spaceThree])/5));
      fourJ.push(parseInt((input[a][spaceFour])/5));
      fiveJ.push(parseInt((input[a][spaceFive])/5));
    }
  }
  else if (clicker_judges.length == 6)
  {
    for (var a=0;a<input.length;a++)
    {
      oneJ.push(parseInt((input[a][spaceOne])/6));
      twoJ.push(parseInt((input[a][spaceTwo])/6));
      threeJ.push(parseInt((input[a][spaceThree])/6));
      fourJ.push(parseInt((input[a][spaceFour])/6));
      fiveJ.push(parseInt((input[a][spaceFive])/6));
      sixJ.push(parseInt((input[a][spaceSix])/6));
    }
  }
    setupTexCompChart(oneJ, twoJ, threeJ, fourJ, fiveJ, sixJ);
  }

function setupTexCompChart(l1, l2, l3, l4, l5, l6) {
  console.log(results_order);
  if (clicker_judges.length == 1)
  {
    Highcharts.chart('texcomp-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TEx Comp'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
            name: clicker_judges[0],
            data: l1
        }]
    });
  }
  else if (clicker_judges.length == 2)
  {
    Highcharts.chart('texcomp-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TEx Comp'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
            name: clicker_judges[0],
            data: l1
        },
        {
          name: clicker_judges[1],
          data: l2
        }]
    });
  }
  else if (clicker_judges.length == 3)
  {
    Highcharts.chart('texcomp-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TEx Comp'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
            name: clicker_judges[0],
            data: l1
        },
        {
          name: clicker_judges[1],
          data: l2
        },
        {
          name: clicker_judges[2],
          data: l3
        }]
    });
  }
  else if (clicker_judges.length == 4)
  {
    Highcharts.chart('texcomp-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TEx Comp'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
            name: clicker_judges[0],
            data: l1
        },
        {
          name: clicker_judges[1],
          data: l2
        },
        {
          name: clicker_judges[2],
          data: l3
        },
        {
          name: clicker_judges[3],
          data: l4
        }]
    });
  }
  else if (clicker_judges.length == 5)
  {
    Highcharts.chart('texcomp-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TEx Comp'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
            name: clicker_judges[0],
            data: l1
        },
        {
          name: clicker_judges[1],
          data: l2
        },
        {
          name: clicker_judges[2],
          data: l3
        },
        {
          name: clicker_judges[3],
          data: l4
        },
        {
          name: clicker_judges[4],
          data: l5
        }]
    });
  }
  else if (clicker_judges.length == 6)
  {
    Highcharts.chart('texcomp-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'TEx Comp'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
            name: clicker_judges[0],
            data: l1
        },
        {
          name: clicker_judges[1],
          data: l2
        },
        {
          name: clicker_judges[2],
          data: l3
        },
        {
          name: clicker_judges[3],
          data: l4
        },
        {
          name: clicker_judges[4],
          data: l5
        },
        {
          name: clicker_judges[5],
          data: l6
        }]
    });
  }

  $('#finish').hide();
  $('#texcomp-chart').show();
}



  function setupResultChart(tech, te, pe) {
    texComp();
    Highcharts.chart('result-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Final Results'
        },
        xAxis: {
            categories: results_order
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
        series:
        [{
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
