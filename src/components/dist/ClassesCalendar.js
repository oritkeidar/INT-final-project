"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_big_calendar_1 = require("react-big-calendar");
require("react-big-calendar/lib/css/react-big-calendar.css");
var moment_1 = require("moment");
var AccountContext_1 = require("../context/AccountContext");
require("./ClassesCalendar.css");
var localizer = react_big_calendar_1.momentLocalizer(moment_1["default"]);
var MyCalendar = function () {
    var currentDate = new Date();
    var dayStyleGetter = function (date) {
        // Check if the date is the current date
        var isCurrentDate = moment_1["default"](date).isSame(currentDate, 'day');
        var currentDateCellClass = isCurrentDate ? 'current-date-cell' : '';
        return {
            className: currentDateCellClass
        };
    };
    var eightAM = moment_1["default"]().set({ hour: 8, minute: 0, second: 0, millisecond: 0 });
    var ninePM = moment_1["default"]().set({ hour: 22, minute: 0, second: 0, millisecond: 0 });
    var userDetails = react_1.useContext(AccountContext_1.accountContext);
    var _a = react_1.useState([]), userEvents = _a[0], setUserEvents = _a[1];
    var events = [];
    react_1.useEffect(function () {
        setUserEvents(userDetails[0].events);
    }, []);
    var customFormats = {
        dayHeaderFormat: 'dddd, MMMM D, YYYY',
        timeGutterFormat: 'H:mm',
        eventTimeRangeFormat: function (_a) {
            var start = _a.start, end = _a.end;
            return moment_1["default"](start).format('H:mm') + " - " + moment_1["default"](end).format('H:mm');
        }
    };
    for (var i = 0; i < userEvents.length; i++) {
        var _b = userEvents[i].date.split('/').map(Number), month = _b[0], day = _b[1], year = _b[2];
        var _c = userEvents[i].hour.split(':').map(Number), hour = _c[0], minute = _c[1];
        var dateObject = new Date(year, month - 1, day, hour, minute, 0);
        events.push({
            title: userEvents[i].className + " with " + userEvents[i].instructorName,
            start: dateObject,
            end: new Date(dateObject.getTime() + 60 * 60 * 1000)
        });
    }
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_big_calendar_1.Calendar, { localizer: localizer, events: events, startAccessor: "start", endAccessor: "end", style: { height: 500 }, views: ['month', 'week', 'day'], dayPropGetter: dayStyleGetter, min: eightAM.toDate(), max: ninePM.toDate(), formats: customFormats, step: 60, timeslots: 1 })));
};
exports["default"] = MyCalendar;
