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
var axios_1 = require("axios");
var reactstrap_1 = require("reactstrap");
var validator_1 = require("validator");
require("./PasswordResetRequest.css");
function PasswordResetRequest() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(false), isValidEmail = _b[0], setIsValidEmail = _b[1];
    var handleOnChange = function (e) {
        var typedEmail = e.target.value;
        setEmail(typedEmail);
        setIsValidEmail(validateEmail(typedEmail));
    };
    var validateEmail = function (email) {
        return validator_1["default"].isEmail(email);
    };
    var handleSendEmail = function () { return __awaiter(_this, void 0, void 0, function () {
        var root, response, user, root, response_1, massage, root;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!email) return [3 /*break*/, 5];
                    if (!!isValidEmail) return [3 /*break*/, 1];
                    root = document.getElementById("reset-password");
                    root.innerText = "Please type a valid email address";
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, axios_1["default"].post("http://localhost:3000/find-user-email", { username: email })];
                case 2:
                    response = _a.sent();
                    user = response.data.user;
                    if (!!user) return [3 /*break*/, 3];
                    root = document.getElementById("reset-password");
                    root.innerText =
                        "This email not exist on our records. Please type again or register";
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, axios_1["default"].post("http://localhost:3000/forgot-password", { email: email })];
                case 4:
                    response_1 = _a.sent();
                    massage = response_1.data;
                    window.localStorage.setItem("resetPassword", massage);
                    root = document.getElementById("reset-password-massage");
                    root.innerText =
                        "Password reset email sent successfully\n Check your email box, click on the link and follow instuctions";
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "reset-password-request" },
        react_1["default"].createElement("h2", null, "*** Password reset email ***"),
        react_1["default"].createElement(reactstrap_1.Form, { id: "reset-passsword-form" },
            react_1["default"].createElement(reactstrap_1.Input, { id: "user-email", className: "rounded-0", type: "email", placeholder: "Enter your user email", onChange: handleOnChange, name: "email", required: true }),
            react_1["default"].createElement(reactstrap_1.Button, { id: "reset-request", onClick: handleSendEmail }, "Send email"),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", { id: "reset-password" })),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", { id: "reset-password-massage" })))));
}
exports["default"] = PasswordResetRequest;
