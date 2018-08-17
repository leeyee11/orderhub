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
            max: 500000,
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
        //     name: 'IBM',
        //     type: 'scatter',
        //     itemStyle: itemStyle,
        //     data: dataBJ
        // },
        // {
        //     name: 'AAPL',
        //     type: 'scatter',
        //     itemStyle: itemStyle,
        //     data: dataSH
        // },
        // {
        //     name: 'WMT',
        //     type: 'scatter',
        //     itemStyle: itemStyle,
        //     data: dataGZ
        // }
    ]
  }
}



export default options;

