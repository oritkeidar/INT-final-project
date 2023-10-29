"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.useAuthContext = exports.AuthContext = void 0;
var react_1 = require("react");
var apiClients_1 = require("../apiClients");
var react_router_dom_1 = require("react-router-dom");
var Footer_1 = require("../components/Footer");
exports.AuthContext = react_1.createContext({ state: { isLoggedIn: false }, dispatch: function () { return undefined; } });
var getDefaultAuthState = function () {
    var isAccessToken = window.localStorage.getItem("accessToken");
    return {
        isLoggedIn: isAccessToken ? true : false
    };
};
var AuthHelper = function (_a) {
    var _this = this;
    var children = _a.children, authState = _a.authState, setAuthState = _a.setAuthState;
    var navigate = react_router_dom_1.useNavigate();
    var logout = react_1.useCallback(function () {
        setAuthState(__assign(__assign({}, authState), { isLoggedIn: false }));
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("userFirstName");
        navigate("/login");
    }, [authState]);
    react_1.useLayoutEffect(function () {
        var interceptorResponses = apiClients_1["default"].interceptors.response.use(function (res) { return res; }, function (error) { return __awaiter(_this, void 0, void 0, function () {
            var refreshToken, response, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(error.response.status === 401)) return [3 /*break*/, 3];
                        refreshToken = window.localStorage.getItem("refreshToken");
                        if (!refreshToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, apiClients_1["default"].post("http://localhost:3000/token", { refreshToken: refreshToken })];
                    case 1:
                        response = _a.sent();
                        accessToken = response.data.accessToken;
                        if (accessToken) {
                            window.localStorage.setItem("accessToken", accessToken);
                        }
                        else {
                            logout();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        console.log(error);
                        logout();
                        _a.label = 3;
                    case 3:
                        alert("Error from server, status: " + error.response.status);
                        return [2 /*return*/];
                }
            });
        }); });
        var interceptorRequests = apiClients_1["default"].interceptors.request.use(function (req) {
            var accessToken = window.localStorage.getItem("accessToken");
            if (accessToken) {
                req.headers.authorization = "Bearer " + accessToken;
            }
            return req;
        }, function (error) { return error; });
        return function () {
            apiClients_1["default"].interceptors.response.eject(interceptorResponses);
            apiClients_1["default"].interceptors.request.eject(interceptorRequests);
        };
    }, [authState]);
    return React.createElement(React.Fragment, null, children);
};
var AuthProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(getDefaultAuthState()), authState = _b[0], setAuthState = _b[1];
    return (React.createElement(exports.AuthContext.Provider, { value: { state: authState, dispatch: setAuthState } },
        React.createElement(AuthHelper, { authState: authState, setAuthState: setAuthState },
            children,
            React.createElement(Footer_1["default"], null))));
};
var useAuthContext = function () {
    var context = react_1.useContext(exports.AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within App");
    }
    var state = context.state, dispatch = context.dispatch;
    return __assign(__assign({}, state), { dispatch: function (renewObject) {
            dispatch(__assign(__assign({}, state), renewObject));
        } });
};
exports.useAuthContext = useAuthContext;
exports["default"] = AuthProvider;
