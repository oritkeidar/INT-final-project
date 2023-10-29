"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var AccountContext_1 = require("../context/AccountContext");
var apiClients_1 = require("../apiClients");
require("./MatrixClasses.css");
var sportClasses = [
    {
        day: "Sun",
        hour: "8:00",
        className: "Yoga",
        classInstructor: "Shai Danon"
    },
    {
        day: "Sun",
        hour: "9:00",
        className: "Pilates",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Sun",
        hour: "10:00",
        className: "Kickbox",
        classInstructor: "Nir Azuri"
    },
    {
        day: "Sun",
        hour: "11:00",
        className: "Swimming",
        classInstructor: "Ziv Barabi"
    },
    {
        day: "Sun",
        hour: "12:00",
        className: "Spinning",
        classInstructor: "Bar Shimhoni"
    },
    {
        day: "Sun",
        hour: "13:00",
        className: "Body Shape",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Sun",
        hour: "14:00",
        className: "Pilates Equipment",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Sun",
        hour: "15:00",
        className: "Aerobic Dance",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Sun",
        hour: "16:00",
        className: "Body Attack",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Sun",
        hour: "17:00",
        className: "Body Pump",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Sun",
        hour: "18:00",
        className: "Belly Dance",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Sun",
        hour: "19:00",
        className: "Holistic Stratching",
        classInstructor: "Saar Kohavi"
    },
    {
        day: "Sun",
        hour: "20:00",
        className: "Shaping & Toning",
        classInstructor: "Saar Kohavi"
    },
    {
        day: "Sun",
        hour: "21:00",
        className: "TRX",
        classInstructor: "Shai Danon"
    },
    {
        day: "Mon",
        hour: "8:00",
        className: "Core Fitness",
        classInstructor: "Ziv Barabi"
    },
    {
        day: "Mon",
        hour: "9:00",
        className: "Dynamic Shape",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Mon",
        hour: "10:00",
        className: "Fit Ball",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Mon",
        hour: "11:00",
        className: "Pilates Equipment",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Mon",
        hour: "12:00",
        className: "Spinning",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Mon",
        hour: "13:00",
        className: "Yoga",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Mon",
        hour: "14:00",
        className: "Shaping & Toning",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Mon",
        hour: "15:00",
        className: "Body Combat",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Mon",
        hour: "16:00",
        className: "Kickbox",
        classInstructor: "Hanan Zehavi"
    },
    { day: "Mon", hour: "17:00", className: "TRX", classInstructor: "Nir Azuri" },
    {
        day: "Mon",
        hour: "18:00",
        className: "Belly Dance",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Mon",
        hour: "19:00",
        className: "Aerobic Dance",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Mon",
        hour: "20:00",
        className: "Swimming",
        classInstructor: "Hanan Zehavi"
    },
    {
        day: "Mon",
        hour: "21:00",
        className: "Pilates",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Tue",
        hour: "8:00",
        className: "Yoga",
        classInstructor: "Shai Danon"
    },
    {
        day: "Tue",
        hour: "9:00",
        className: "Body Shape",
        classInstructor: "Bar Shimhon"
    },
    {
        day: "Tue",
        hour: "10:00",
        className: "Fit Ball",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Tue",
        hour: "11:00",
        className: "Holistic Stratching",
        classInstructor: "Saar Kohavi"
    },
    {
        day: "Tue",
        hour: "12:00",
        className: "Spinning",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Tue",
        hour: "13:00",
        className: "Shaping & Toning",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Tue",
        hour: "14:00",
        className: "Body Combat",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Tue",
        hour: "15:00",
        className: "Aerobic Dance",
        classInstructor: "Shiri Shavit"
    },
    { day: "Tue", hour: "16:00", className: "TRX", classInstructor: "Nir Azuri" },
    {
        day: "Tue",
        hour: "17:00",
        className: "Kickbox",
        classInstructor: "Nir Azuri"
    },
    {
        day: "Tue",
        hour: "18:00",
        className: "Body Attack",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Tue",
        hour: "19:00",
        className: "Spinning",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Tue",
        hour: "20:00",
        className: "Zumba",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Tue",
        hour: "21:00",
        className: "Belly Dance",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Wed",
        hour: "8:00",
        className: "Swimming",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Wed",
        hour: "9:00",
        className: "Fit Ball",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Wed",
        hour: "10:00",
        className: "Body Shape",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Wed",
        hour: "11:00",
        className: "Body Combat",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Wed",
        hour: "12:00",
        className: "Dynamic Shape",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Wed",
        hour: "13:00",
        className: "Pilates",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Wed",
        hour: "14:00",
        className: "Shaping & Toning",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Wed",
        hour: "15:00",
        className: "Belly Dance",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Wed",
        hour: "16:00",
        className: "Aerobic Dance",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Wed",
        hour: "17:00",
        className: "Body Pump",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Wed",
        hour: "18:00",
        className: "Zumba",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Wed",
        hour: "19:00",
        className: "Pilates Equipment",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Wed",
        hour: "20:00",
        className: "TRX",
        classInstructor: "Shai Danon"
    },
    {
        day: "Wed",
        hour: "21:00",
        className: "Holistic Stratching",
        classInstructor: "Saar Kohavi"
    },
    { day: "Thu", hour: "8:00", className: "TRX", classInstructor: "Shai Danon" },
    {
        day: "Thu",
        hour: "9:00",
        className: "Kickbox",
        classInstructor: "Hanan Zehavi"
    },
    {
        day: "Thu",
        hour: "10:00",
        className: "Body Combat",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Thu",
        hour: "11:00",
        className: "Swimming",
        classInstructor: "Ziv Barabi"
    },
    {
        day: "Thu",
        hour: "12:00",
        className: "Zumba",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Thu",
        hour: "13:00",
        className: "Pilates Equipment",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Thu",
        hour: "14:00",
        className: "Body Attack",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Thu",
        hour: "15:00",
        className: "Pilates",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Thu",
        hour: "16:00",
        className: "Yoga",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Thu",
        hour: "17:00",
        className: "Body Pump",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Thu",
        hour: "18:00",
        className: "Core Fitness",
        classInstructor: "Ziv Barabi"
    },
    {
        day: "Thu",
        hour: "19:00",
        className: "Aerobic Dance",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Thu",
        hour: "20:00",
        className: "Shaping & Toning",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Thu",
        hour: "21:00",
        className: "Spinning",
        classInstructor: "Meir Ezra"
    },
    {
        day: "Fri",
        hour: "8:00",
        className: "Holistic Stratching",
        classInstructor: "Saar Kohavi"
    },
    {
        day: "Fri",
        hour: "8:00",
        className: "Body Shape",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Fri",
        hour: "9:00",
        className: "Dynamic Shape",
        classInstructor: "Guy Shemesh"
    },
    {
        day: "Fri",
        hour: "10:00",
        className: "Yoga",
        classInstructor: "Shiri Shavit"
    },
    {
        day: "Fri",
        hour: "11:00",
        className: "Zumba",
        classInstructor: "Dana Ozeri"
    },
    {
        day: "Fri",
        hour: "12:00",
        className: "Pilates",
        classInstructor: "Shai Danon"
    },
    {
        day: "Fri",
        hour: "13:00",
        className: "Belly Dance",
        classInstructor: "Galit Cohen"
    },
    {
        day: "Fri",
        hour: "14:00",
        className: "Pilates Equipment",
        classInstructor: "Danit Aharon"
    },
    {
        day: "Fri",
        hour: "15:00",
        className: "Kickbox",
        classInstructor: "Nir Azuri"
    },
    {
        day: "Fri",
        hour: "16:00",
        className: "Aerobic Dance",
        classInstructor: "Shiri Shavit"
    },
];
var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
var hoursOfDay = Array.from({ length: 14 }, function (_, i) { return i + 8; });
var MatrixTable = function () {
    var _a = react_1.useState({}), messages = _a[0], setMessages = _a[1];
    var currentDate = new Date();
    var currentDay = new Date().toLocaleDateString("en-US", {
        weekday: "short"
    });
    var currentDayIndex = currentDate.getDay(); // 0 for Sunday, 1 for Monday, and so on
    var nextSundayDate = new Date(currentDate);
    if (currentDayIndex !== 0) {
        nextSundayDate.setDate(currentDate.getDate() + (7 - currentDayIndex));
    }
    var initialDates = [];
    var _b = react_1.useContext(AccountContext_1.accountContext), userDetails = _b[0], setUserDetails = _b[1];
    console.log(userDetails);
    // Calculate initial dates for the table
    for (var i = 0; i < currentDayIndex; i++) {
        var date = new Date(nextSundayDate);
        date.setDate(nextSundayDate.getDate() + i);
        initialDates.push(date.toLocaleDateString("en-US"));
    }
    var j = 0;
    for (var i = currentDayIndex; i < 6; i++) {
        var date = new Date();
        date.setDate(date.getDate() + j);
        initialDates.push(date.toLocaleDateString("en-US"));
        j = j + 1;
    }
    var _c = react_1.useState(initialDates), dates = _c[0], setDates = _c[1];
    react_1.useEffect(function () {
        setDates(initialDates);
    }, []);
    var include = false;
    var handleAddEvent = function (data, date, cellKey) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, formatDate, eventData, currentDate, dayNow, day, dayOfEvent, messageText, messageText, i, messageText, response, messageText, dataFromServer;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    userId = window.localStorage.getItem("userId");
                    formatDate = function (dateString) {
                        var date = new Date(dateString);
                        var options = {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                        };
                        return date.toLocaleDateString("en-US", options);
                    };
                    eventData = {
                        date: formatDate(date),
                        hour: data.hour,
                        className: data.className,
                        instructorName: data.classInstructor
                    };
                    currentDate = new Date();
                    dayNow = currentDate.getDay();
                    day = data.day;
                    dayOfEvent = 0;
                    if (!userDetails.activities.includes(data.className)) {
                        messageText = "You are not allowed to book this class. Add activity";
                        setMessages(__assign(__assign({}, messages), (_a = {}, _a[cellKey] = messageText, _a)));
                    }
                    if (!userDetails.activities.includes(data.className)) return [3 /*break*/, 6];
                    if (day === "Sun")
                        dayOfEvent = 0;
                    else if (day === "Mon")
                        dayOfEvent = 1;
                    else if (day === "Tue")
                        dayOfEvent = 2;
                    else if (day === "Wed")
                        dayOfEvent = 3;
                    else if (day === "Thu")
                        dayOfEvent = 4;
                    else
                        dayOfEvent = 5;
                    if (!(dayOfEvent === dayNow &&
                        parseInt(data.hour, 10) < currentDate.getHours())) return [3 /*break*/, 1];
                    messageText = "Event time has passed";
                    setMessages(__assign(__assign({}, messages), (_b = {}, _b[cellKey] = messageText, _b)));
                    return [3 /*break*/, 6];
                case 1:
                    if (!((userDetails.activities.includes(data.className) &&
                        dayOfEvent !== dayNow) ||
                        (userDetails.activities.includes(data.className) &&
                            dayOfEvent === dayNow &&
                            parseInt(data.hour, 10) > currentDate.getHours()))) return [3 /*break*/, 6];
                    for (i = 0; i < userDetails.events.length; i++) {
                        if (userDetails.events[i].date === eventData.date &&
                            userDetails.events[i].hour === eventData.hour &&
                            userDetails.events[i].className === eventData.className &&
                            userDetails.events[i].instructorName === eventData.instructorName) {
                            include = true;
                        }
                    }
                    if (!include) return [3 /*break*/, 2];
                    messageText = "You have booked for this event already";
                    setMessages(__assign(__assign({}, messages), (_c = {}, _c[cellKey] = messageText, _c)));
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/add-event", { eventData: eventData, userId: userId })];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/getUserAccount", { userId: userId })];
                case 4:
                    response = _e.sent();
                    messageText = "Booked event: " + date + ", " + data.className + " with " + data.classInstructor;
                    setMessages(__assign(__assign({}, messages), (_d = {}, _d[cellKey] = messageText, _d)));
                    return [4 /*yield*/, response.data];
                case 5:
                    dataFromServer = _e.sent();
                    setUserDetails(dataFromServer);
                    _e.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "classes-table" },
        react_1["default"].createElement("table", null,
            react_1["default"].createElement("thead", { id: 'table-head' },
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", { style: { width: '40px' } }, "Time"),
                    daysOfWeek.map(function (day, index) { return (react_1["default"].createElement("th", { key: index, style: {
                            backgroundColor: day === currentDay ? "yellow" : "black",
                            color: day === currentDay ? "black" : "white"
                        } },
                        day,
                        react_1["default"].createElement("br", null),
                        dates[index])); }))),
            react_1["default"].createElement("tbody", null, hoursOfDay.map(function (hour) { return (react_1["default"].createElement("tr", { key: hour, style: { width: '50px',
                    backgroundColor: hour % 2 === 0 ? "lightslategray" : "lightgrey"
                } },
                react_1["default"].createElement("th", null, hour + ":00"),
                daysOfWeek.map(function (day, dayIndex) {
                    var classData = sportClasses.find(function (item) { return item.day === day && item.hour === hour + ":00"; });
                    var cellKey = day + "-" + hour;
                    return (react_1["default"].createElement("td", { key: cellKey }, classData && (react_1["default"].createElement("div", null,
                        react_1["default"].createElement("p", null,
                            classData.className,
                            " - ",
                            classData.classInstructor),
                        react_1["default"].createElement("button", { id: "book-event", onClick: function () {
                                return handleAddEvent(classData, dates[dayIndex], cellKey);
                            } }, "Add Event"),
                        messages[cellKey] && (react_1["default"].createElement("div", { className: "message" }, messages[cellKey]))))));
                }))); })))));
};
exports["default"] = MatrixTable;
