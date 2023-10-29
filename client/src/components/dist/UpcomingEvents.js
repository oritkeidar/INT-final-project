"use strict";
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
require("./UpcomingEvents.css");
function UpcomingEvents() {
    var _this = this;
    var _a = react_1.useContext(AccountContext_1.accountContext), userDetails = _a[0], setUserDetails = _a[1];
    var _b = react_1.useState([]), allEvents = _b[0], setAllEvents = _b[1];
    console.log(userDetails);
    var userId = window.localStorage.getItem("userId");
    var currentDate = new Date();
    var events = [];
    console.log(userDetails);
    react_1.useEffect(function () {
        setAllEvents(userDetails.events);
    }, [userDetails]);
    console.log(allEvents);
    for (var i = 0; i < allEvents.length; i++) {
        var dateString = allEvents[i].date;
        var dateParts = dateString.split("/"); // Split the string into parts using '/'
        var year = parseInt(dateParts[2], 10); // Parse the year part as an integer
        var month = parseInt(dateParts[0], 10) - 1; // Parse the month part as an integer (subtract 1 because months are zero-based)
        var day = parseInt(dateParts[1], 10); // Parse the day part as an integer
        var hour = parseInt(allEvents[i].hour);
        var dateObject = new Date(year, month, day, hour);
        if (currentDate <= dateObject) {
            events.push(allEvents[i]);
        }
    }
    var sortedUpComingEvents = events.sort(function (a, b) { return parseInt(a.hour) - parseInt(b.hour); });
    var handleDeleteEvent = function (eventId) { return __awaiter(_this, void 0, void 0, function () {
        var response, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, apiClients_1["default"]["delete"]("http://localhost:3000/delete-event/" + userId + "/" + eventId)];
                case 1:
                    response = _b.sent();
                    return [4 /*yield*/, response.data];
                case 2:
                    result = _b.sent();
                    setUserDetails(result);
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    console.log('error');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("table", { id: "upcoming" },
            react_1["default"].createElement("thead", { id: "upcoming-title" },
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", null, "Date"),
                    react_1["default"].createElement("th", null, "hour"),
                    react_1["default"].createElement("th", null, "activity"),
                    react_1["default"].createElement("th", null, "with"))),
            sortedUpComingEvents.map(function (event, index) { return (react_1["default"].createElement("tbody", { style: { border: '1px solid black' } },
                react_1["default"].createElement("tr", { key: index, id: "upcoming-columns" },
                    react_1["default"].createElement("td", null, event.date),
                    react_1["default"].createElement("td", null, event.hour),
                    react_1["default"].createElement("td", null, event.className),
                    react_1["default"].createElement("td", null, event.instructorName),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement("button", { onClick: function () { return handleDeleteEvent(event._id); }, style: { color: "red" } }, "Delete event"))))); }))));
}
exports["default"] = UpcomingEvents;
