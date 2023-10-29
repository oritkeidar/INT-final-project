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
var validator_1 = require("validator");
var apiClients_1 = require("../apiClients");
require("./SignUp.css");
var react_router_dom_2 = require("react-router-dom");
var ClipLoader_1 = require("react-spinners/ClipLoader");
function SignUp() {
    var _this = this;
    var _a = react_1.useState(""), firstName = _a[0], setFirstName = _a[1];
    var _b = react_1.useState(""), lastName = _b[0], setLastName = _b[1];
    var _c = react_1.useState(""), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(""), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(false), isValidEmail = _e[0], setIsValidEmail = _e[1];
    var _f = react_1.useState(false), isValidPassword = _f[0], setIsValidPassword = _f[1];
    var _g = react_1.useState(false), isButtonPressed = _g[0], setIsButtonPressed = _g[1];
    var _h = react_1.useState(false), isUserExist = _h[0], setIsUserExist = _h[1];
    var navigate = react_router_dom_2.useNavigate();
    var override = {
        display: "block",
        margin: "0 auto",
        borderColor: "blue"
    };
    var getOnChange = function (setFunc) {
        var handleOnChange = function (e) {
            setFunc(e.target.value);
        };
        return handleOnChange;
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
        if (newPassword.length <= 7) {
            setIsValidPassword(false);
        }
        else {
            setIsValidPassword(true);
        }
    };
    var signUp = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, sign;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsButtonPressed(true);
                    if (!(!isValidEmail || !isValidPassword)) return [3 /*break*/, 1];
                    alert("Email or password invalid");
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/find-user-email", { username: email })];
                case 2:
                    response = _a.sent();
                    if (!!response.data.user) return [3 /*break*/, 4];
                    return [4 /*yield*/, apiClients_1["default"].put("http://localhost:3000/register", {
                            firstName: firstName,
                            lastName: lastName,
                            username: email,
                            password: password
                        }, { withCredentials: true, method: "PUT" })];
                case 3:
                    _a.sent();
                    setIsUserExist(true);
                    sign = document.getElementById("sign-up");
                    sign.innerHTML = "Sign up succesfully ...";
                    setTimeout(function () {
                        navigate("/login");
                    }, 4000);
                    return [3 /*break*/, 5];
                case 4:
                    alert("This user already exist in the system");
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "sign-up " },
        react_1["default"].createElement(reactstrap_1.Form, { style: {
                textAlign: "center",
                marginLeft: "620px",
                width: "300px",
                height: "300px",
                alignItems: "stretch",
                justifyContent: "space-between"
            } },
            react_1["default"].createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "blue",
                    margin: "5px"
                }, className: "rounded-0", placeholder: "First name", onChange: getOnChange(setFirstName), name: "firstName", required: true }),
            react_1["default"].createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "blue",
                    margin: "5px"
                }, className: "rounded-0", placeholder: "Last name", onChange: getOnChange(setLastName), name: "lastName", required: true }),
            react_1["default"].createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    border: isValidEmail ? "1px solid grey" : "1px solid red",
                    margin: "5px"
                }, className: isValidEmail ? "" : "invalid", type: "email", value: email, placeholder: "Email ID", onChange: handleInputEmail, name: "email", required: true }),
            react_1["default"].createElement(reactstrap_1.Input, { style: {
                    fontSize: "14px",
                    height: "25px",
                    color: "black",
                    border: isValidPassword ? "1px solid grey" : "1px solid red",
                    margin: "5px"
                }, className: isValidPassword ? "" : "invalid", placeholder: "password", onChange: handleInputPassword, name: "password", minLength: 8, required: true }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(react_router_dom_1.Link, { id: "have-account", to: "/login" }, "already have account?")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(reactstrap_1.Button, { style: {
                        fontSize: "16px",
                        fontWeight: "bold",
                        height: "25px",
                        color: "black",
                        margin: "10px"
                    }, 
                    // block
                    color: "dark", size: "sm", onClick: signUp }, "Sign up"),
                !isValidEmail && (react_1["default"].createElement("p", { style: { color: "red" } }, "Please insert a valid email")),
                !isValidPassword && (react_1["default"].createElement("p", { style: { color: "red" } }, "Passsword must contain at least 8 characters")),
                react_1["default"].createElement("div", { style: { color: "green", fontSize: "12px", fontWeight: "bold" }, id: "sign-up" }),
                isButtonPressed &&
                    isValidEmail &&
                    isValidPassword &&
                    isUserExist && react_1["default"].createElement(ClipLoader_1["default"], { cssOverride: override })))));
}
exports["default"] = SignUp;
