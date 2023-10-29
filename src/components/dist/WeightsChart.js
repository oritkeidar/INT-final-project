"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AccountContext_1 = require("../context/AccountContext");
var auto_1 = require("chart.js/auto");
var chart_js_1 = require("chart.js");
var WeightsLineChart_1 = require("./WeightsLineChart");
require("./WeightsChart.css");
auto_1["default"].register(chart_js_1.CategoryScale);
function WeightsChart() {
    var userDetails = react_1.useContext(AccountContext_1.accountContext);
    console.log(userDetails);
    var _a = react_1.useState({
        labels: userDetails[0].weighings.map(function (data) { return data.weighingDate; }),
        datasets: [{
                label: "Weights",
                data: userDetails[0].weighings.map(function (data) { return data.weight; }),
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: "black",
                borderWidth: 2
            }
        ]
    }), userWeights = _a[0], setUserWeights = _a[1];
    return (react_1["default"].createElement("div", { className: 'weights-chart' },
        react_1["default"].createElement(WeightsLineChart_1["default"], { chartData: userWeights })));
}
exports["default"] = WeightsChart;
