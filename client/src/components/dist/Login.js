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
var reactstrap_1 = require("reactstrap");
var ClipLoader_1 = require("react-spinners/ClipLoader");
var axios_1 = require("axios");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./Login.css");
var AuthProvider_1 = require("../context/AuthProvider");
var bs_1 = require("react-icons/bs");
var validator_1 = require("validator");
function Login() {
    var _this = this;
    var _a = react_1.useState(""), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(""), password = _b[0], setPassword = _b[1];
    var _c = react_1.useState(false), isValidEmail = _c[0], setIsValidEmail = _c[1];
    var _d = react_1.useState(false), isValidPassword = _d[0], setIsValidPassword = _d[1];
    var _e = react_1.useState(false), showPassword = _e[0], setShowPassword = _e[1];
    var _f = react_1.useState(false), isButtonPressed = _f[0], setIsButtonPressed = _f[1];
    var navigate = react_router_dom_1.useNavigate();
    var dispatchAuthContext = AuthProvider_1.useAuthContext().dispatch;
    var override = {
        display: "block",
        margin: "0 auto",
        borderColor: "blue"
    };
    var validateEmail = function (email) {
        return validator_1["default"].isEmail(email);
    };
    var handleInputEmail = function (event) {
        var newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(validateEmail(newEmail));
    };
    var handleInputPassword = function (event) {
        var newPassword = event.target.value;
        setPassword(newPassword);
        if (password.length >= 8)
            return setIsValidPassword(true);
        else {
            return setIsValidPassword(false);
        }
    };
    var togglePasswordVisibility = function () {
        setShowPassword(!showPassword);
    };
    var handleForgotPassword = function () {
        navigate("/forgot-password");
    };
    var login = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, response_1, accessToken, refreshToken, userFirstName, userId, logIn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!isValidEmail) return [3 /*break*/, 1];
                    alert("Invalid email address. Please type again");
                    return [3 /*break*/, 10];
                case 1: return [4 /*yield*/, axios_1["default"].post("http://localhost:3000/find-user-email", { username: email, password: password }, { method: "Post", withCredentials: true })];
                case 2:
                    response = _a.sent();
                    if (!!response.data.user) return [3 /*break*/, 3];
                    alert("Account doesn't exists. Please register");
                    return [3 /*break*/, 10];
                case 3: return [4 /*yield*/, axios_1["default"].post("http://localhost:3000/login", { username: email, password: password }, { method: "Post", withCredentials: true })];
                case 4:
                    response_1 = _a.sent();
                    if (!response_1.data.accessToken) return [3 /*break*/, 9];
                    return [4 /*yield*/, response_1.data.accessToken];
                case 5:
                    accessToken = _a.sent();
                    window.localStorage.setItem("accessToken", accessToken);
                    return [4 /*yield*/, response_1.data.refreshToken];
                case 6:
                    refreshToken = _a.sent();
                    window.localStorage.setItem("refreshToken", refreshToken);
                    return [4 /*yield*/, response_1.data.user.firstName];
                case 7:
                    userFirstName = _a.sent();
                    window.localStorage.setItem("userFirstName", userFirstName);
                    return [4 /*yield*/, response_1.data.user._id];
                case 8:
                    userId = _a.sent();
                    window.localStorage.setItem("userId", userId);
                    dispatchAuthContext({ isLoggedIn: true });
                    setIsButtonPressed(true);
                    logIn = document.getElementById("log-in");
                    logIn.innerHTML = "Login successfully !";
                    console.log(logIn);
                    setTimeout(function () {
                        navigate("/getUserAccount");
                    }, 3000);
                    return [3 /*break*/, 10];
                case 9:
                    alert("Incorrect passsword");
                    _a.label = 10;
                case 10: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "Login " },
        React.createElement(reactstrap_1.Form, { style: {
                textAlign: "center",
                marginLeft: "620px",
                width: "300px",
                height: "300px",
                alignItems: "stretch",
                justifyContent: "space-between"
            } },
            React.createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "blue",
                    margin: "5px"
                }, className: "rounded-0", type: "email", placeholder: "Email", onChange: handleInputEmail, name: "email", required: true }),
            React.createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "blue",
                    margin: "5px"
                }, type: showPassword ? "text" : "password", className: "rounded-0", placeholder: "password", value: password, onChange: handleInputPassword, name: "password", autoComplete: "on", minLength: 8, required: true }),
            React.createElement("div", { className: "toggle-password" }, showPassword ? (React.createElement(bs_1.BsFillEyeFill, { onClick: togglePasswordVisibility })) : (React.createElement(bs_1.BsFillEyeSlashFill, { onClick: togglePasswordVisibility }))),
            React.createElement(reactstrap_1.Button, { onClick: function () { return navigate("/register"); }, color: "link", className: "text-decoration-none", style: { fontSize: "14px", height: "25px", color: "blue" } }, "Create new Account"),
            React.createElement(reactstrap_1.Button, { color: "link", className: "text-decoration-none", style: { fontSize: "14px", height: "25px", color: "blue" }, onClick: handleForgotPassword }, "Forgot password?"),
            React.createElement(reactstrap_1.Button, { style: {
                    fontSize: "16px",
                    fontWeight: "bold",
                    height: "25px",
                    color: "black",
                    margin: "10px"
                }, block: true, color: "dark", size: "sm", onClick: login }, "Log In"),
            React.createElement("div", { style: { color: "green", fontSize: "12px", fontWeight: "bold" }, id: "log-in" }),
            isButtonPressed && React.createElement(ClipLoader_1["default"], { cssOverride: override }))));
}
exports["default"] = Login;
