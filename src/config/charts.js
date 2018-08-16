// var dataBJ = [
//     [1,55,9],
//     [2,25,11],
//     [3,56,7],
//     [4,33,7],
//     [5,42,24],
//     [6,82,58],
//     [7,74,49],
//     [8,78,55],
//     [9,267,216],
//     [10,185,127],
//     [11,39,19],
//     [12,41,11],
//     [13,64,38],
//     [14,108,79],
//     [15,108,63],
//     [16,33,6],
//     [17,94,66],
//     [18,186,142],
//     [19,57,31],
//     [20,22,8],
//     [21,39,15],
//     [22,94,69],
//     [23,99,73],
//     [24,31,12],
//     [25,42,27],
//     [26,154,117],
//     [27,234,185],
//     [28,160,120],
//     [29,134,96],
//     [30,52,24],
//     [31,46,5]
// ];

// var dataGZ = [
//     [1,26,37],
//     [2,85,62],
//     [3,78,38],
//     [4,21,21],
//     [5,41,42],
//     [6,56,52],
//     [7,64,30],
//     [8,55,48],
//     [9,76,85],
//     [10,91,81],
//     [11,84,39],
//     [12,64,51],
//     [13,70,69],
//     [14,77,105],
//     [15,109,68],
//     [16,73,68],
//     [17,54,27],
//     [18,51,61],
//     [19,91,71],
//     [20,73,102],
//     [21,73,50],
//     [22,84,94],
//     [23,93,77],
//     [24,99,130],
//     [25,146,84],
//     [26,113,108],
//     [27,81,48],
//     [28,56,48],
//     [29,82,92],
//     [30,106,116],
//     [31,118,50]
// ];

// var dataSH = [
//     [1,91,45],
//     [2,65,27],
//     [3,83,60],
//     [4,109,81],
//     [5,106,77],
//     [6,109,81],
//     [7,106,77],
//     [8,89,65],
//     [9,53,33],
//     [10,80,55],
//     [11,117,81],
//     [12,99,71],
//     [13,95,69],
//     [14,116,87],
//     [15,108,80],
//     [16,134,83],
//     [17,79,43],
//     [18,71,46],
//     [19,97,71],
//     [20,84,57],
//     [21,87,63],
//     [22,104,77],
//     [23,87,62],
//     [24,168,128],
//     [25,65,45],
//     [26,39,24],
//     [27,39,24],
//     [28,93,68],
//     [29,188,143],
//     [30,174,131],
//     [31,187,143]
// ];

var schema = [
    {name: 'date', index: 0, text: ''},
    {name: 'qty', index: 1, text: 'Quantity'},
    {name: 'amt', index: 2, text: 'Amount'}
];


var itemStyle = {
    normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
};

const options={
  "priceHistory":{
    title: {
        text: 'Index',
        left: 0
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data: ['Daily K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        scale: true,
        boundaryGap : false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    },
    yAxis: {
        scale: true,
        splitArea: {
            show: true
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 50,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
        }
    ],
    series: [
        {
            name: 'Daily K',
            type: 'candlestick',
            itemStyle: {
                normal: {
                    color: "#ec0000",
                    color0: "#00da3c",
                    borderColor: "#8A0000",
                    borderColor0: "#008F28"
                }
            },
            markPoint: {
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                data: [
                    {
                        name: 'XX标点',
                        coord: ['2013/5/31', 2300],
                        value: 2300,
                        itemStyle: {
                            normal: {color: 'rgb(41,60,85)'}
                        }
                    },
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    },
                    {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }
                ],
                tooltip: {
                    formatter: function (param) {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            },
            markLine: {
                symbol: ['none', 'none'],
                data: [
                    [
                        {
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {show: false},
                                emphasis: {show: false}
                            }
                        },
                        {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {show: false},
                                emphasis: {show: false}
                            }
                        }
                    ],
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                ]
            }
        },
        {
            name: 'MA5',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA10',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA20',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA30',
            type: 'line',
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },

    ]
},
"scatter":{
    // backgroundColor: '#404a59',
    color:['#dd4444', '#fec42c', '#80F1BE','#d94e5d','#eac736','#50a3ba','#f2c31a', '#24b7f2'],
    legend: {
        y: 'top',
        // data: ['北京', '上海', '广州'],
        textStyle: {
            // color: '#fff',
            fontSize: 16
        }
    },
    grid: {
        x: '10%',
        x2: 150,
        y: '18%',
        y2: '10%'
    },
    tooltip: {
        padding: 10,
        backgroundColor: '#222',
        // borderColor: '#777',
        borderWidth: 1,
        formatter: function (obj) {
            var value = obj.value;
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + obj.seriesName + ' ' + value[0] + '日'
                + '</div>'
                + schema[1].text + '：' + value[1] + '<br>'
                + schema[2].text + '：' + value[2] + '<br>'
        }
    },
    xAxis: {
        type: 'category',
        name: 'Date',
        nameGap: 16,
        nameTextStyle: {
            // color: '#fff',
            fontSize: 14
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                // color: '#eee'
            }
        }
    },
    yAxis: {
        type: 'value',
        name: 'Quantity',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
            // color: '#fff',
            fontSize: 16
        },
        axisLine: {
            lineStyle: {
                // color: '#eee'
            }
        },
        splitLine: {
            show: false
        }
    },
    visualMap: [
        {
            left: 'right',
            top: '10%',
            dimension: 2,
            min: 0,
            max: 10000,
            itemWidth: 6,
            itemHeight: 48,
            calculable: true,
            precision: 0.1,
            text: ['Amount'],
            textGap: 30,
            textStyle: {
                // color: '#fff'
            },
            inRange: {
                symbolSize: [10, 70]
            },
            outOfRange: {
                symbolSize: [10, 70],
                color: ['rgba(255,255,255,.2)']
            },
            controller: {
                inRange: {
                    color: ['#80F1BE']
                },
                outOfRange: {
                    color: ['#444']
                }
            }
        }
    ],
    series: [
        // {
        //     name: '北京',
        //     type: 'scatter',
        //     itemStyle: itemStyle,
        //     data: dataBJ
        // },
        // {
        //     name: '上海',
        //     type: 'scatter',
        //     itemStyle: itemStyle,
        //     data: dataSH
        // },
        // {
        //     name: '广州',
        //     type: 'scatter',
        //     itemStyle: itemStyle,
        //     data: dataGZ
        // }
    ]
  }
}



export default options;

