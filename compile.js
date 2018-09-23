

function loadArray(input, name) {
  console.log(input);
  for (var i=0; i<input.length; i++)
  {
    if (name == "tech")
    {
    techScores.push(parseFloat(input[i]));
    }
    else if (name == "eval")
    {
    evalScores.push(parseFloat(input[i]));
    }
  }

}

function getResults() {
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",
  range: "RESULT!H3:H15"
  }).then((response) => {
  loadArray(response.result.values, "tech");
  gapi.client.sheets.spreadsheets.values.get({
  spreadsheetId: "1OYeK4_TvSn4kvPD5082SSs5oaN-ugzISIjf0g5TLcxM",
  range: "RESULT!Q3:Q15"
  }).then((response) => {
  loadArray(response.result.values, "eval");
  setupChart(techScores, evalScores);
  console.log(techScores, evalScores);
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });
  }, function(reason) {
  console.error("error: " + reason.result.error.message);
  alert("Error.");
  });

}

  function setupChart(tech, eval) {
    Highcharts.chart('final-chart', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Stacked column chart'
        },
        xAxis: {
            categories: playerList
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
            name: 'Tech',
            data: tech
        }, {
            name: 'Eval',
            data: eval
        },
        ]
    });

    // Highcharts.chart('final-chart', {
    //     chart: {
    //         type: 'column'
    //     },
    //     title: {
    //         text: 'Stacked column chart'
    //     },
    //     xAxis: {
    //         categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    //     },
    //     yAxis: {
    //         min: 0,
    //         title: {
    //             text: 'Total fruit consumption'
    //         },
    //         stackLabels: {
    //             enabled: true,
    //             style: {
    //                 fontWeight: 'bold',
    //                 color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
    //             }
    //         }
    //     },
    //     legend: {
    //         align: 'right',
    //         x: -30,
    //         verticalAlign: 'top',
    //         y: 25,
    //         floating: true,
    //         backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
    //         borderColor: '#CCC',
    //         borderWidth: 1,
    //         shadow: false
    //     },
    //     tooltip: {
    //         headerFormat: '<b>{point.x}</b><br/>',
    //         pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    //     },
    //     plotOptions: {
    //         column: {
    //             stacking: 'normal',
    //             dataLabels: {
    //                 enabled: true,
    //                 color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
    //             }
    //         }
    //     },
    //     series: [{
    //         name: 'John',
    //         data: [5, 3, 4, 7, 2]
    //     }, {
    //         name: 'Jane',
    //         data: [2, 2, 3, 2, 1]
    //     }, {
    //         name: 'Joe',
    //         data: [3, 4, 4, 2, 5]
    //     }]
    // });
    $('#final-chart').show();
  }
