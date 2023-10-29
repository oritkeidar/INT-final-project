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
var react_router_dom_1 = require("react-router-dom");
var apiClients_1 = require("../apiClients");
var bs_1 = require("react-icons/bs");
require("./PasswordReset.css");
function PasswordReset() {
    var _this = this;
    var token = react_router_dom_1.useParams().token;
    var _a = react_1.useState(""), newPassword = _a[0], setNewPassword = _a[1];
    var _b = react_1.useState(""), confirmNewPassword = _b[0], setConfirmNewPassword = _b[1];
    var _c = react_1.useState(false), showNewPassword = _c[0], setShowNewPassword = _c[1];
    var _d = react_1.useState(false), showConfirmNewPassword = _d[0], setShowConfirmNewPassword = _d[1];
    var navigate = react_router_dom_1.useNavigate();
    var handleNewPassword = function (e) {
        setNewPassword(e.target.value);
    };
    var handleConfirmNewPassword = function (e) {
        setConfirmNewPassword(e.target.value);
    };
    var toggleNewPasswordVisibility = function () {
        setShowNewPassword(!showNewPassword);
    };
    var toggleConfirmNewPasswordVisibility = function () {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };
    var handleResetPassword = function () { return __awaiter(_this, void 0, void 0, function () {
        var reset, response, reset, reset;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(newPassword.length < 8)) return [3 /*break*/, 1];
                    reset = document.getElementById("reset-massage");
                    reset.innerHTML = "Password must contain at least 8 characters!";
                    return [3 /*break*/, 4];
                case 1:
                    if (!(newPassword === confirmNewPassword)) return [3 /*break*/, 3];
                    return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/reset-password", { token: token, newPassword: newPassword })];
                case 2:
                    response = _a.sent();
                    reset = document.getElementById("reset-massage");
                    reset.innerHTML = "Password updated successfully";
                    setTimeout(function () {
                        navigate('/login');
                    }, 2000);
                    return [3 /*break*/, 4];
                case 3:
                    reset = document.getElementById("reset-massage");
                    reset.innerHTML = "Passwords doesn't match!!!";
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { id: "reset-password-page" },
        react_1["default"].createElement("h2", null, "*** Reset Password ***"),
        react_1["default"].createElement(reactstrap_1.Form, { id: "reset-password" },
            react_1["default"].createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "black",
                    //   border: isValidPassword ? "1px solid grey" : "1px solid red",
                    margin: "5px"
                }, 
                // className={isValidPassword ? "" : "invalid"}
                type: showNewPassword ? "text" : "password", placeholder: "Insert New Password", onChange: handleNewPassword, name: "newPassword", minLength: 8, required: true }),
            react_1["default"].createElement("div", { className: "toggle-newPassword" }, showNewPassword ? (react_1["default"].createElement(bs_1.BsFillEyeFill, { onClick: toggleNewPasswordVisibility })) : (react_1["default"].createElement(bs_1.BsFillEyeSlashFill, { onClick: toggleNewPasswordVisibility }))),
            react_1["default"].createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "black",
                    //   border: isValidPassword ? "1px solid grey" : "1px solid red",
                    margin: "5px"
                }, 
                // className={isValidPassword ? "" : "invalid"}
                type: showConfirmNewPassword ? "text" : "password", placeholder: "Confirm New Password", onChange: handleConfirmNewPassword, name: "confirmNewPassword", minLength: 8, required: true }),
            react_1["default"].createElement("div", { className: "toggle-confirm-newPassword" }, showConfirmNewPassword ? (react_1["default"].createElement(bs_1.BsFillEyeFill, { onClick: toggleConfirmNewPasswordVisibility })) : (react_1["default"].createElement(bs_1.BsFillEyeSlashFill, { onClick: toggleConfirmNewPasswordVisibility }))),
            react_1["default"].createElement(reactstrap_1.Button, { onClick: handleResetPassword, id: "update-password" }, "Update password !"),
            react_1["default"].createElement("p", { id: "reset-massage" }))));
}
exports["default"] = PasswordReset;
