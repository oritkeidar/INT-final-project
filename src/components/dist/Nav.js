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
require("./Nav.css");
var fa_1 = require("react-icons/fa");
var react_router_dom_1 = require("react-router-dom");
var AuthProvider_1 = require("../context/AuthProvider");
var apiClients_1 = require("../apiClients");
var AccountContext_1 = require("../context/AccountContext");
var LogoutConfirmation_1 = require("./LogoutConfirmation");
var pi_1 = require("react-icons/pi");
var firebaseCloud_1 = require("../components/firebaseCloud");
function Nav() {
    var _this = this;
    var _a = react_1.useState(false), isListOpen = _a[0], setIsListOpen = _a[1];
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var _c = react_1.useState(false), showConfirmation = _c[0], setShowConfirmation = _c[1];
    var _d = AuthProvider_1.useAuthContext(), dispatchAuthContext = _d.dispatch, isLoggedIn = _d.isLoggedIn;
    var userDetails = react_1.useContext(AccountContext_1.accountContext);
    var navigate = react_router_dom_1.useNavigate();
    var handleMouseEnter = function () {
        setIsListOpen(true);
    };
    var handleSignUp = function () {
        setIsListOpen(false);
        navigate("/register");
    };
    var handleLogin = function () {
        setIsListOpen(false);
        navigate("/login");
    };
    var handleLogout = function () {
        setIsListOpen(false);
        setShowConfirmation(true);
    };
    var cancelLogout = function () {
        setShowConfirmation(false);
    };
    var confirmLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        var deactivateSession;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    deactivateSession = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            apiClients_1["default"]
                                .post("http://localhost:3000/logout", { userDetails: userDetails }, { withCredentials: true })["finally"](function () {
                                window.localStorage.removeItem("accessToken");
                                window.localStorage.removeItem("refreshToken");
                                window.localStorage.removeItem("userFirstName");
                                window.localStorage.removeItem("userId");
                                window.localStorage.removeItem("resetPassword");
                            });
                            dispatchAuthContext({ isLoggedIn: false });
                            setIsLoading(false);
                            setShowConfirmation(false);
                            return [2 /*return*/];
                        });
                    }); };
                    return [4 /*yield*/, deactivateSession()];
                case 1:
                    _a.sent();
                    navigate("/Login");
                    return [2 /*return*/];
            }
        });
    }); };
    var handleUserProfile = function () {
        setIsListOpen(false);
        if (isLoggedIn) {
            navigate("/getUserProfile");
        }
        else
            navigate("/login");
    };
    var handleUserAccount = function () {
        setIsListOpen(false);
        if (isLoggedIn) {
            navigate("/getUserAccount");
        }
        else
            navigate("/login");
    };
    return (react_1["default"].createElement("div", { className: "container" },
        react_1["default"].createElement("div", { className: "left-container" },
            react_1["default"].createElement("ul", null,
                react_1["default"].createElement("li", null, isLoggedIn ? (react_1["default"].createElement("button", { id: "notification-button", onClick: firebaseCloud_1.requestFirebaseNotificationPermission },
                    react_1["default"].createElement(pi_1.PiNotificationBold, { id: "notification-icon" }))) : ("")),
                react_1["default"].createElement("div", { className: "user-icon", onClick: handleMouseEnter },
                    react_1["default"].createElement("li", null,
                        isLoggedIn
                            ? "hello, " + window.localStorage.getItem("userFirstName")
                            : "Account",
                        " ",
                        react_1["default"].createElement(fa_1.FaUserAlt, null))),
                isListOpen && (react_1["default"].createElement("ul", { style: { display: "block" }, className: "user-list" },
                    react_1["default"].createElement("li", { onClick: handleUserProfile, style: { color: "black", cursor: "pointer" } }, "your profile"),
                    react_1["default"].createElement("li", { onClick: handleUserAccount, style: { color: "black", margin: "20px", cursor: "pointer" } }, "your account"),
                    !isLoggedIn ? (react_1["default"].createElement("li", { onClick: handleLogin, style: {
                            color: "black",
                            marginTop: "40px",
                            cursor: "pointer"
                        } }, "Log in")) : (""),
                    !isLoggedIn ? (react_1["default"].createElement("li", { onClick: handleSignUp, style: { color: "black", margin: "20px", cursor: "pointer" } }, "Sign up")) : (""),
                    isLoggedIn ? (react_1["default"].createElement("li", { onClick: handleLogout, style: { color: "black", margin: "20px", cursor: "pointer" } }, "Log out")) : (""))),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(react_router_dom_1.Link, { style: { textDecoration: "none", color: "white" }, to: "/home" }, "Home")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(react_router_dom_1.Link, { style: { textDecoration: "none", color: "white" }, to: "/activities" }, "Activities")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(react_router_dom_1.Link, { style: { textDecoration: "none", color: "white" }, to: "/instructors" }, "Instructors")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(react_router_dom_1.Link, { style: { textDecoration: "none", color: "white" }, to: "/contacts" }, "Contacts")))),
        react_1["default"].createElement("div", { className: "right-container" },
            react_1["default"].createElement("ul", null,
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(fa_1.FaFacebook, null)),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(fa_1.FaTwitter, null)),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement(fa_1.FaTiktok, null))),
            react_1["default"].createElement("div", null, showConfirmation && (react_1["default"].createElement(LogoutConfirmation_1["default"], { onCancel: cancelLogout, onConfirm: confirmLogout }))))));
}
exports["default"] = Nav;
