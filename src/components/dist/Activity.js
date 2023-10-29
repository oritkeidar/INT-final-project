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
var apiClients_1 = require("../apiClients");
var react_router_dom_1 = require("react-router-dom");
var AuthProvider_1 = require("../context/AuthProvider");
var AccountContext_1 = require("../context/AccountContext");
function Activity(_a) {
    var _this = this;
    var activity = _a.activity;
    var _b = react_1.useState(false), isButtonPressed = _b[0], setIsButtonPressed = _b[1];
    var _c = react_1.useState(false), isActivity = _c[0], setIsActivity = _c[1];
    var navigate = react_router_dom_1.useNavigate();
    var Auth = AuthProvider_1.useAuthContext();
    var _d = react_1.useContext(AccountContext_1.accountContext), userDetails = _d[0], setUserDetails = _d[1];
    var userId = window.localStorage.getItem("userId");
    var handleAddActivity = function (activity) {
        if (Auth.isLoggedIn) {
            sendDataToServer(activity.activityName);
            setIsButtonPressed(true);
        }
        else {
            navigate("/login");
        }
    };
    var sendDataToServer = function (activityName) { return __awaiter(_this, void 0, void 0, function () {
        var response, activityMassage, activityMassage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/get-activity", { userId: userId })];
                case 1:
                    response = _a.sent();
                    if (response.data.activities.includes(activityName)) {
                        setIsActivity(true);
                        activityMassage = document.getElementById("activity-massage");
                        activityMassage.innerHTML =
                            "This activity is already in your list of activities";
                    }
                    else {
                        setIsActivity(false);
                        activityMassage = document.getElementById("activity-massage");
                        activityMassage.innerHTML =
                            "Activity added to your active activiities list";
                        addActivity(activityName, userDetails);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var addActivity = function (activityName, userDetails) { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/add-activity", { activityName: activityName, userDetails: userDetails })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, apiClients_1["default"].post('http://localhost:3000/getUserAccount', { userId: userId })];
                case 2:
                    response = _a.sent();
                    setUserDetails(response.data);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(reactstrap_1.Col, { sm: 4 },
            react_1["default"].createElement(reactstrap_1.Card, null,
                react_1["default"].createElement(reactstrap_1.CardBody, null,
                    react_1["default"].createElement(reactstrap_1.CardTitle, { style: { fontSize: "12px", fontWeight: "bold" } },
                        react_1["default"].createElement("h2", null, activity.activityName))),
                react_1["default"].createElement("img", { style: { height: "300px", width: "300px" }, src: activity.activityImage, alt: "" }),
                react_1["default"].createElement("button", { name: "activityName", value: activity.activityName, id: "add-activity", onClick: function () { return handleAddActivity(activity); } }, "Add activity"),
                isButtonPressed && isActivity && react_1["default"].createElement("p", { style: { fontSize: '15px', color: 'red' }, id: "activity-massage" }),
                isButtonPressed && !isActivity && react_1["default"].createElement("p", { style: { fontSize: '15px' }, id: "activity-massage" })))));
}
exports["default"] = Activity;
