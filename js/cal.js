$('#getWeatherBtn').click(() => {
    $('.chart-container').hide();
    var cityname = $('#cityname').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=572e01f494d5c8e9baf8f328020a7d48`,
        success: (data) => {
            $('#currentTemperature').html(parseInt(data.main.temp - 270)),
                $('#currentHumidity').html(data.main.humidity),
                $('#currentPressure').html(data.main.pressure)
        },
        error: (err) => console.log('In error callback')
    });
});
$('#getForecastBtn').click(() => {
    $('.table').hide();
    var cityname = $('#cityname').val();
    $.ajax({
        type: 'GET',
        url: `http://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=572e01f494d5c8e9baf8f328020a7d48`,
        success: (data) => {
            console.log('In success callback');
            console.log(data);

            listOfDates = data.list.map((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            console.log(listOfDates);
            listOfTemp = data.list.map(ele => parseInt(ele.main.temp - 270));
            console.log(listOfTemp);
            plotChart(listOfTemp, listOfDates);
        },
        error: (err) => console.log('In error callback')
    });
    const plotChart = (tempArr, datesArr) => {
        $('#chart-container').show();
        Highcharts.chart('chart-container', {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Temperature Prediction'
            },
            xAxis: {
                categories: datesArr
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function () { return this.value + '°'; }
                }
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            plotOptions: {
                spline: {
                    marker: {
                        radius: 4,
                        lineColor: '#008000',
                        lineWidth: 1
                    }
                }
            },
            series: [{
                name: cityname,
                marker: {
                    symbol: 'circle'
                },
                data: tempArr

            }]
        });
    }
})
    //     const plotChart = (tempArr, datesArr) => {
    //         $('#chart-container').show();
    //     Highcharts.chart('container', {
    //         chart: {
    //             type: 'line'
    //         },
    //         title: {
    //             text: 'Temparatute'
    //         },
    //         xAxis: {
    //             categories: datesArr
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Temperature (°C)'
    //             },
    //             labels: {
    //                 formatter: function () { return this.value + '°'; }
    //             }
    //         },
    //         tooltip: {
    //             crosshairs: true,
    //             shared: true
    //         },
    //         plotOptions: {
    //             line: {
    //                 dataLabels: {
    //                     enabled: true
    //                 },
    //                 enableMouseTracking: false
    //             }
    //         },
    //         series: [{
    //             name:cityname,
    //             data: tempArr
    //         }]
    //     });
    // }
       