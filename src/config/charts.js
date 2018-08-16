const options={
  "priceHistory":{
    "title": {
       "text": "Balance",
       "subtext": "From ExcelHome",
       "sublink": "http://e.weibo.com/1341556070/Aj1J2x5a5"
    },
   "tooltip": {
       "trigger": "axis",
       "axisPointer": {          
           "type": "shadow"        
        }
    },
   "legend": {
       "data":["Profit","Loss"]
    },
   "grid": {
       "left": "3%",
       "right": "4%",
       "bottom": "3%",
       "containLabel": true
    },
   "xAxis": {
      "type":"category",
      "splitLine": {"show":false},
      "axisLabel":{
          "formatter": function (value, index) {
            var date = new Date(value);
            var texts = [(date.getMonth() + 1), date.getDate()];
            if (index === 0) {
              texts.unshift(date.getYear());
            }
            return texts.join('/');
          }
        }
       // "data":  ["Sep 1st","Sep 2nd","Sep 3rd","Sep 4th","Sep 5th","Sep 6th","Sep 7th","Sep 8th","Sep 9th","Sep 10th"]
    },
   "yAxis": {
      "min":"dataMin",
      "type": "value"
    },
   "series": [
        {
           "name": "Price",
           "type": "bar",
           "stack": "总量",
           "itemStyle": {
               "normal": {
                   "barBorderColor": "rgba(0,0,0,0)",
                   "color": "rgba(0,0,0,0)"
                },
               "emphasis": {
                   "barBorderColor": "rgba(0,0,0,0)",
                   "color": "rgba(0,0,0,0)"
                }
            }
           // "data": [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
        },
        {
           "name": "Profit",
           "type": "bar",
           "stack": "总量",
           "label": {
               "normal": {
                   "show": true,
                   "position": "top"
                }
            }
           // "data": [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"]
        },
        {
           "name": "Loss",
           "type": "bar",
           "stack": "总量",
           "label": {
               "normal": {
                   "show": true,
                   "position": "bottom"
                }
            },
           // "data": ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203]
        }
    ]
	},
	"balance":{
   	"title": {
       "text": "Balance",
       "subtext": "From ExcelHome",
       "sublink": "http://e.weibo.com/1341556070/Aj1J2x5a5"
    },
   "tooltip": {
       "trigger": "axis",
       "axisPointer": {          
           "type": "shadow"        
        }
    },
   "legend": {
       "data":["Profit","Loss"]
    },
   "grid": {
       "left": "3%",
       "right": "4%",
       "bottom": "3%",
       "containLabel": true
    },
   "xAxis": {
       "type": "category",
       "splitLine": {"show":false},
       "data":  ["Sep 1st","Sep 2nd","Sep 3rd","Sep 4th","Sep 5th","Sep 6th","Sep 7th","Sep 8th","Sep 9th","Sep 10th"]
    },
   "yAxis": {
       "type": "value"
    },
   "series": [
        {
           "name": "Price",
           "type": "bar",
           "stack": "总量",
           "itemStyle": {
               "normal": {
                   "barBorderColor": "rgba(0,0,0,0)",
                   "color": "rgba(0,0,0,0)"
                },
               "emphasis": {
                   "barBorderColor": "rgba(0,0,0,0)",
                   "color": "rgba(0,0,0,0)"
                }
            },
           "data": [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
        },
        {
           "name": "Profit",
           "type": "bar",
           "stack": "总量",
           "label": {
               "normal": {
                   "show": true,
                   "position": "top"
                }
            },
           "data": [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"]
        },
        {
           "name": "Loss",
           "type": "bar",
           "stack": "总量",
           "label": {
               "normal": {
                   "show": true,
                   "position": "bottom"
                }
            },
           "data": ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203]
        }
    ]

	}
}
export default options;

