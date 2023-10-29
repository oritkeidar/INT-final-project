"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var Matrix = /** @class */ (function (_super) {
    __extends(Matrix, _super);
    function Matrix(props) {
        var _this = _super.call(this, props) || this;
        // Initialize state with the current date and time range
        var startDate = new Date();
        startDate.setHours(8, 0, 0, 0); // Start at 8:00 AM
        var endDate = new Date(startDate);
        endDate.setHours(21, 0, 0, 0); // End at 21:00 PM
        // Generate date headers for the next 7 days
        var dateHeaders = [];
        for (var i = 0; i < 7; i++) {
            var currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            dateHeaders.push({
                date: currentDate.toLocaleDateString(),
                day: currentDate.toLocaleDateString("en-US", { weekday: "short" })
            });
        }
        console.log(dateHeaders);
        // Example data for sport classes and instructors
        var sportClasses = [
            { className: "Yoga", classInstructor: "Shai Danon" },
            { className: "Pilates", classInstructor: "Shiri Shavit" },
            { className: "Kickbox", classInstructor: "Nir Azuri" },
            { className: "Swimming", classInstructor: "Ziv Barabii" },
            { className: "Spinning", classInstructor: "Bar Shimhoni" },
            { className: "Body Shape", classInstructor: "Galit Cohen" },
            { className: "Pilates Equipment", classInstructor: "Danit Aharon" },
            { className: "Aerobic Dance", classInstructor: "Dana Ozeri" },
            { className: "Body Attack", classInstructor: "Dana Ozeri" },
            { className: "Body Pump", classInstructor: "Meir Ezra" },
            { className: "Belly Dance", classInstructor: "Galit Cohen" },
            { className: "Holistic Stratching", classInstructor: "Saar Kohavi" },
            { className: "Shaping & Toning", classInstructor: "Saar Kohavi" },
            { className: "TRX", classInstructor: "Shai Danon" },
            { className: "Core Fitness", classInstructor: "Ziv Barabi" },
            { className: "Dynamic Shape", classInstructor: "Guy Shemesh" },
            { className: "Fit Ball", classInstructor: "Danit Aharon" },
            { className: "Pilates Equipment", classInstructor: "Danit Aharon" },
            { className: "Spinning", classInstructor: "Meir Ezra" },
            { className: "Yoga", classInstructor: "Shiri Shavit" },
            { className: "Shaping & Toning", classInstructor: "Dana Ozeri" },
            { className: "Body Combat", classInstructor: "Meir Ezra" },
            { className: "Kickbox", classInstructor: "Hanan Zehavi" },
            { className: "TRX", classInstructor: "Nir Azuri" },
            { className: "Belly Dance", classInstructor: "Galit Cohen" },
            { className: "Aerobic Dance", classInstructor: "Shiri Shavit" },
            { className: "Swimming", classInstructor: "Hanan Zehavi" },
            { className: "Pilates", classInstructor: "Shiri Shavit" },
            { className: "Yoga", classInstructor: "Shai Danon" },
            { className: "Body Shape", classInstructor: "Bar Shimhon" },
            { className: "Fit Ball", classInstructor: "Danit Aharon" },
            { className: "Holistic Stratching", classInstructor: "Saar Kohavi" },
            { className: "Spinning", classInstructor: "Guy Shemesh" },
            { className: "Shaping & Toning", classInstructor: "Dana Ozeri" },
            { className: "Body Combat", classInstructor: "Guy Shemesh" },
            { className: "Aerobic Dance", classInstructor: "Shiri Shavit" },
            { className: "TRX", classInstructor: "Nir Azuri" },
            { className: "Kickbox", classInstructor: "Nir Azuri" },
            { className: "Body Attack", classInstructor: "Meir Ezra" },
            { className: "Spinning", classInstructor: "Guy Shemesh" },
            { className: "Zumba", classInstructor: "Dana Ozeri" },
            { className: "Belly Dance", classInstructor: "Galit Cohen" },
            { className: "Swimming", classInstructor: "Galit Cohen" },
            { className: "Fit Ball", classInstructor: "Danit Aharon" },
            { className: "Body Shape", classInstructor: "Galit Cohen" },
            { className: "Body Combat", classInstructor: "Meir Ezra" },
            { className: "Dynamic Shape", classInstructor: "Guy Shemesh" },
            { className: "pilates", classInstructor: "Shiri Shavit" },
            { className: "Shaping & Toning", classInstructor: "Dana Ozeri" },
            { className: "Belly Dance", classInstructor: "Galit Cohen" },
            { className: "Aerobic Dance", classInstructor: "Shiri Shavit" },
            { className: "Body Pump", classInstructor: "Guy Shemesh" },
            { className: "Zumba", classInstructor: "Danit Aharon" },
            { className: "Pilates Equipment", classInstructor: "Danit Aharon" },
            { className: "TRX", classInstructor: "Shai Danon" },
            { className: "Holistic Stratching", classInstructor: "Saar Kohavi" },
            { className: "TRX", classInstructor: "Shai Danon" },
            { className: "Kickbox", classInstructor: "Hanan Zehavi" },
            { className: "Body Combat", classInstructor: "Guy Shemesh" },
            { className: "Swimming", classInstructor: "Ziv Barabi" },
            { className: "Zumba", classInstructor: "Dana Ozeri" },
            { className: "Pilates Equipment", classInstructor: "Danit Aharon" },
            { className: "Body Attack", classInstructor: "Meir Ezra" },
            { className: "Pilates", classInstructor: "Shiri Shavit" },
            { className: "Yoga", classInstructor: "Shiri Shavit" },
            { className: "Body Pump", classInstructor: "Guy Shemesh" },
            { className: "Core Fitness", classInstructor: "Ziv Barabi" },
            { className: "Aerobic Dance", classInstructor: "Dana Ozeri" },
            { className: "Shaping & Toning", classInstructor: "Dana Ozeri" },
            { className: "Spinning", classInstructor: "Meir Ezra" },
            { className: "Holistic Stratching", classInstructor: "Saar Kohavi" },
            { className: "Body Shape", classInstructor: "Guy Shemesh" },
            { className: "Dynamic Shape", classInstructor: "Guy Shemesh" },
            { className: "Yoga", classInstructor: "Shiri Shavit" },
            { className: "Zumba", classInstructor: "Dana Ozeri" },
            { className: "Pilates", classInstructor: "Shai Danon" },
            { className: "Belly Dance", classInstructor: "Galit Cohen" },
        ];
        console.log(sportClasses.length);
        _this.state = {
            startDate: startDate,
            endDate: endDate,
            dateHeaders: dateHeaders,
            sportClasses: sportClasses,
            matrixData: _this.generateMatrixData(dateHeaders.length, sportClasses.length)
        };
        return _this;
    }
    // Generate random matrix data for sport classes and instructors
    Matrix.prototype.generateMatrixData = function (rows, cols) {
        var matrixData = [];
        for (var i = 0; i < rows; i++) {
            var rowData = [];
            for (var j = 0; j < cols; j++) {
                var sportClass = "Yoga";
                var instructor = "Galit";
                rowData.push(sportClass, instructor);
            }
            matrixData.push(rowData);
        }
        return matrixData;
    };
    // Function to handle the "Add Event" button click
    Matrix.prototype.handleAddEvent = function (date, hour, sportClass, instructor) {
        // You can send data to the server here
        console.log("Date: " + date + ", Hour: " + hour + ", Sport Class: " + sportClass + ", Instructor: " + instructor);
        // Make an API call to send eventData to the server
        // Example: fetch('/api/addEvent', { method: 'POST', body: JSON.stringify(eventData) })
        // Handle the response as needed
    };
    Matrix.prototype.render = function () {
        var _this = this;
        var _a = this.state, startDate = _a.startDate, endDate = _a.endDate, sportClasses = _a.sportClasses, instructors = _a.instructors, dateHeaders = _a.dateHeaders, matrixData = _a.matrixData;
        var timeHeaders = [];
        // Generate time headers from 8:00 AM to 9:00 PM
        var currentTime = new Date(startDate);
        while (currentTime <= endDate) {
            timeHeaders.push(react_1["default"].createElement("th", { key: currentTime.getHours() }, currentTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })));
            currentTime.setHours(currentTime.getHours() + 1);
        }
        console.log(currentTime.toLocaleDateString("en-US", { weekday: "short" }));
        // Generate the matrix cells
        var matrixCells = [];
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var currentHour = new Date(startDate);
                currentHour.setHours(startDate.getHours() + j);
                var cellData = matrixData[i][j];
                // if (currentTime.toLocaleDateString("en-US", { weekday: "short" })==="sat"){
                //  while (j<14){
                //     matrixCells.push(
                //         <td key={`${i}-${j}`}></td>)
                //  }}
                // for (let x = 0; x < sportClasses.length; x++) {
                matrixCells.push(react_1["default"].createElement("td", { key: i + "-" + j },
                    react_1["default"].createElement("div", null, sportClasses[j]),
                    react_1["default"].createElement("div", null, instructors[j]),
                    react_1["default"].createElement("button", { onClick: function () {
                            return _this.handleAddEvent(dateHeaders[i].date, currentHour.toLocaleTimeString(), cellData.sportClass, cellData.instructor);
                        } }, "Add Event")));
            };
            for (var j = 0; j < sportClasses.length; j++) {
                _loop_2(j);
            }
        };
        for (var i = 0; i < dateHeaders.length; i++) {
            _loop_1(i);
        }
        return (react_1["default"].createElement("table", null,
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", null, "Date"),
                    react_1["default"].createElement("th", null, "Day"),
                    timeHeaders)),
            react_1["default"].createElement("tbody", null, dateHeaders.map(function (header, index) { return (react_1["default"].createElement("tr", { key: index },
                react_1["default"].createElement("td", null, header.date),
                react_1["default"].createElement("td", null, header.day),
                matrixCells.slice(index * timeHeaders.length, (index + 1) * timeHeaders.length))); }))));
    };
    return Matrix;
}(react_1.Component));
exports["default"] = Matrix;
