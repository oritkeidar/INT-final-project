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
var react_router_dom_1 = require("react-router-dom");
var auto_1 = require("chart.js/auto");
var chart_js_1 = require("chart.js");
var UpcomingEvents_1 = require("./UpcomingEvents");
require("./UserAccount.css");
require("react-datepicker/dist/react-datepicker.css");
var apiClients_1 = require("../apiClients");
var MatrixClasses_1 = require("../components/MatrixClasses");
var ClassesCalendar_1 = require("./ClassesCalendar");
var AddWeighing_1 = require("./AddWeighing");
// import 'bootstrap/dist/css/bootstrap.min.css';
auto_1["default"].register(chart_js_1.CategoryScale);
function UserAccount() {
    var _this = this;
    var accountData = react_1.useContext(AccountContext_1.accountContext);
    var _a = react_1.useState([]), userActivities = _a[0], setUserActivities = _a[1];
    var _b = react_1.useState(false), isActivitiesEmpty = _b[0], setIsActivitiesEmpty = _b[1];
    var _c = react_1.useState(false), isShowClassesTable = _c[0], setIsShowClassesTable = _c[1];
    var _d = react_1.useState(false), isShowUpcomingEvents = _d[0], setIsShowUpcomingEvents = _d[1];
    var _e = react_1.useState(false), isOpenCalendar = _e[0], setIsOpenCalendar = _e[1];
    var _f = react_1.useState(false), isAddWeighingPressed = _f[0], setIsAddWeighingPressed = _f[1];
    var _g = react_1.useState([]), userWeights = _g[0], setUserWeights = _g[1];
    var userId = window.localStorage.getItem("userId");
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        setUserActivities(accountData[0].activities);
        if (accountData[0].activities.length === 0) {
            setIsActivitiesEmpty(true);
        }
    }, [accountData]);
    react_1.useEffect(function () {
        setUserWeights(accountData[0].weighings);
    }, [accountData]);
    react_1.useEffect(function () {
        setUserWeights({
            labels: userWeights.map(function (data) { return data.weighingData; }),
            datasets: [
                {
                    label: "Weights",
                    data: userWeights.map(function (data) { return data.weight; }),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0",
                    ],
                    borderColor: "black",
                    borderWidth: 2
                },
            ]
        });
    }, []);
    var handleDeleteActivity = function (activityName) { return __awaiter(_this, void 0, void 0, function () {
        var response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/delete-activity", {
                        userId: userId,
                        activityName: activityName
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/getUserAccount", { userId: userId })];
                case 2:
                    response = _a.sent();
                    user = response.data;
                    setUserActivities(user.activities);
                    if (user.activities.length === 0) {
                        setIsActivitiesEmpty(true);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleClassesVisabilty = function () {
        if (!isShowClassesTable)
            setIsShowClassesTable(true);
        else {
            setIsShowClassesTable(false);
        }
    };
    var handelUpComingEvents = function () {
        if (!isShowUpcomingEvents) {
            setIsShowUpcomingEvents(true);
        }
        else {
            setIsShowUpcomingEvents(false);
        }
    };
    var handleOpenCalendar = function () {
        if (!isOpenCalendar) {
            setIsOpenCalendar(true);
        }
        else {
            setIsOpenCalendar(false);
        }
    };
    var handleButtonPressed = function () {
        if (!isAddWeighingPressed) {
            setIsAddWeighingPressed(true);
        }
        else
            setIsAddWeighingPressed(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { id: "container" },
            isActivitiesEmpty && react_1["default"].createElement("p", { id: "empty" }, "Your activities list is empty"),
            !isActivitiesEmpty && (react_1["default"].createElement("ul", { id: "user-activities-list" },
                react_1["default"].createElement("p", { style: { fontWeight: "bold", fontSize: "20px" } }, "You have signed in for the activities below:"),
                userActivities.map(function (item) { return (react_1["default"].createElement("li", { key: item },
                    item,
                    react_1["default"].createElement("button", { onClick: function () { return handleDeleteActivity(item); }, id: "delete-activity" }, "Delete activity"))); })))),
        react_1["default"].createElement("button", { id: "add-more-activities", onClick: function () { return navigate("/activities"); } }, "Add activity"),
        !isShowClassesTable ? (react_1["default"].createElement("button", { id: "Classes-system", onClick: handleClassesVisabilty }, "Show weekly classes system")) : (react_1["default"].createElement("button", { id: "Classes-system", onClick: handleClassesVisabilty }, "Hide weekly classes system")),
        isShowClassesTable ? react_1["default"].createElement(MatrixClasses_1["default"], null) : "",
        !isShowUpcomingEvents ? (react_1["default"].createElement("button", { id: "upcoming-events", onClick: handelUpComingEvents }, "Upcoming events")) : (react_1["default"].createElement("button", { id: "upcoming-events", onClick: handelUpComingEvents }, "Hide upcoming events")),
        isShowUpcomingEvents ? react_1["default"].createElement(UpcomingEvents_1["default"], null) : "",
        !isOpenCalendar ? (react_1["default"].createElement("button", { id: "calendar", onClick: handleOpenCalendar }, "Open calendar")) : (react_1["default"].createElement("button", { id: "calendar", onClick: handleOpenCalendar }, "Close calendar")),
        isOpenCalendar ? react_1["default"].createElement(ClassesCalendar_1["default"], null) : "",
        react_1["default"].createElement("button", { id: "Add-weighing", onClick: handleButtonPressed }, "Add weighing"),
        isAddWeighingPressed ? react_1["default"].createElement(AddWeighing_1["default"], null) : "",
        react_1["default"].createElement("button", { id: "weights-line-chart", onClick: function () { return navigate("/weights-chart"); } }, "Show Weights trend line chart")));
}
exports["default"] = UserAccount;
