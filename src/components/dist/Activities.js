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
var reactstrap_1 = require("reactstrap");
var Activity_1 = require("./Activity");
var axios_1 = require("axios");
require("./Activities.css");
function Activities() {
    var _a = react_1.useState([{}]), activitiesData = _a[0], setActivitiesData = _a[1];
    var _b = react_1.useState(""), inputText = _b[0], setInputText = _b[1];
    var _c = react_1.useState([{}]), filteredData = _c[0], setFilteredData = _c[1];
    function getActivitiesFromServer() {
        return __awaiter(this, void 0, void 0, function () {
            var response, activities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1["default"].get("http://localhost:3000/getActivities/", {
                            method: "GET",
                            withCredentials: true
                        })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        activities = _a.sent();
                        //adding the posts to the context
                        if (activities) {
                            setActivitiesData(activities); //setting the state
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    react_1.useEffect(function () {
        getActivitiesFromServer();
    }, []);
    // sort activities by activiy name
    activitiesData.sort(function (a, b) {
        return a.activityName > b.activityName ? 1 : -1;
    });
    var handleInputChange = function (e) {
        var text = e.target.value;
        setInputText(text);
        var filtered = activitiesData.filter(function (item) {
            return item.activityName.toLowerCase().includes(inputText.toLowerCase());
        });
        setFilteredData(filtered);
        if (!inputText)
            setFilteredData(activitiesData);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(reactstrap_1.Input, { style: {
                height: "35px",
                width: "500px",
                border: "0.5px solid gray",
                marginTop: "150px"
            }, type: "text", placeholder: "Search for activity", value: inputText, onChange: handleInputChange }),
        react_1["default"].createElement(reactstrap_1.CardGroup, { className: "row", style: { margin: '0px' } },
            react_1["default"].createElement(reactstrap_1.Row, null, !inputText
                ? activitiesData.map(function (activity, index) { return (react_1["default"].createElement("ul", { key: index },
                    react_1["default"].createElement("li", { key: activity.activityName },
                        react_1["default"].createElement(Activity_1["default"], { activity: activity })))); })
                : filteredData.map(function (activity, index) { return (react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", { key: index },
                        react_1["default"].createElement(Activity_1["default"], { activity: activity })))); })))));
}
exports["default"] = Activities;
