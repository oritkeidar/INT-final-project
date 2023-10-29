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
var AccountContext_1 = require("../context/AccountContext");
var react_router_dom_1 = require("react-router-dom");
var apiClients_1 = require("../apiClients");
require("./UserProfile.css");
function UserProfile() {
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useContext(AccountContext_1.accountContext), accountData = _a[0], setAccountData = _a[1];
    var _b = react_1.useState({}), userDetails = _b[0], setUserDetails = _b[1];
    function handleRemoveImage() {
        return __awaiter(this, void 0, void 0, function () {
            var userId, response, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = window.localStorage.getItem('userId');
                        return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/delete-user-image", { userId: userId })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.data];
                    case 2:
                        newData = _a.sent();
                        setAccountData(newData);
                        return [2 /*return*/];
                }
            });
        });
    }
    react_1.useEffect(function () {
        setUserDetails(accountData);
    }, [accountData]);
    console.log(accountData);
    console.log(userDetails);
    var activities = accountData.activities;
    console.log(activities);
    var commaSeparatedActivities = activities.join(", ");
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { id: "user-details" },
            react_1["default"].createElement(reactstrap_1.CardGroup, null,
                react_1["default"].createElement(reactstrap_1.Row, null,
                    react_1["default"].createElement(reactstrap_1.Col, { md: 6 },
                        react_1["default"].createElement("img", { id: "profile-picture", style: { height: '350px', width: '350px' }, src: "http://localhost:3000/images/" + userDetails.image, alt: "" })),
                    react_1["default"].createElement(reactstrap_1.Col, { md: 6 },
                        userDetails.image && react_1["default"].createElement("button", { id: "delete-image", onClick: handleRemoveImage }, "Delete profile picture"),
                        react_1["default"].createElement("div", { className: "details" },
                            react_1["default"].createElement("h3", null,
                                "first name: ",
                                react_1["default"].createElement("span", null, userDetails.firstName)),
                            react_1["default"].createElement("h3", null,
                                "last name: ",
                                react_1["default"].createElement("span", null, userDetails.lastName)),
                            react_1["default"].createElement("h3", null,
                                "email: ",
                                react_1["default"].createElement("span", null, userDetails.userName)),
                            react_1["default"].createElement("h3", null,
                                "Address: ",
                                react_1["default"].createElement("span", null, userDetails.address)),
                            react_1["default"].createElement("h3", { id: "activities-list" },
                                "activities:",
                                react_1["default"].createElement("span", null, commaSeparatedActivities))))))),
        react_1["default"].createElement("button", { id: "update-details", onClick: function () { return navigate('/update-user'); } }, "Update details")));
}
exports["default"] = UserProfile;
