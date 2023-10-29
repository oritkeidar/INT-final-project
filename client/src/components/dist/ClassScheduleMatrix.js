"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./ClassScheduleMatrix.css");
var ClassScheduleMatrix = function (_a) {
    var schedule = _a.schedule, handleBookClass = _a.handleBookClass;
    return (react_1["default"].createElement("div", { className: 'classes-table' },
        react_1["default"].createElement("table", null,
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", null),
                    react_1["default"].createElement("th", null, "08:00"),
                    react_1["default"].createElement("th", null, "09:00"),
                    react_1["default"].createElement("th", null, "10:00"),
                    react_1["default"].createElement("th", null, "11:00"),
                    react_1["default"].createElement("th", null, "12:00"),
                    react_1["default"].createElement("th", null, "13:00"),
                    react_1["default"].createElement("th", null, "14:00"),
                    react_1["default"].createElement("th", null, "15:00"),
                    react_1["default"].createElement("th", null, "16:00"),
                    react_1["default"].createElement("th", null, "17:00"),
                    react_1["default"].createElement("th", null, "18:00"),
                    react_1["default"].createElement("th", null, "19:00"),
                    react_1["default"].createElement("th", null, "20:00"),
                    react_1["default"].createElement("th", null, "21:00"))),
            react_1["default"].createElement("tbody", null, schedule.map(function (dayData, rowIndex) { return (react_1["default"].createElement("tr", { key: rowIndex },
                react_1["default"].createElement("td", null),
                react_1["default"].createElement("td", { style: { fontWeight: 'bold' } }, dayData.day),
                dayData.classes.map(function (classItem, colIndex) { return (react_1["default"].createElement("td", { key: colIndex },
                    react_1["default"].createElement("div", null, classItem.className),
                    react_1["default"].createElement("button", { id: "book", value: classItem.className, onClick: function () { return handleBookClass(dayData.day, dayData.hour, classItem.className); } }, "Book"),
                    react_1["default"].createElement("p", { id: "book-massage" }))); }))); })))));
};
exports["default"] = ClassScheduleMatrix;
