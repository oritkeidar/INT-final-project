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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.getUsernameByReq = exports.REFRESH_TOKENS = exports.VALID_TOKENS = void 0;
var sessionAuthenticator_1 = require("./sessionAuthenticator");
var mongoose_1 = require("mongoose");
var jwt = require("jsonwebtoken");
exports.VALID_TOKENS = {};
exports.REFRESH_TOKENS = {};
var getUsernameByReq = function (req) {
    var _a, _b;
    if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
        console.log((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.name);
        // return req.user.name
        //  console.log(req)
        //  console.log(req.body)
    }
    else { // sessions authentication management
        return (_b = req === null || req === void 0 ? void 0 : req.cookies) === null || _b === void 0 ? void 0 : _b.username;
    }
};
exports.getUsernameByReq = getUsernameByReq;
function authMiddleware(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var passedAuthorization, authorizationHeader, accessToken_1, expirationTime, username, sessionId;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    passedAuthorization = false;
                    console.log(process.env.AUTHENTICATION_MGMT_METHOD);
                    if (!(process.env.AUTHENTICATION_MGMT_METHOD == 'token')) return [3 /*break*/, 1];
                    authorizationHeader = req.headers.authorization;
                    console.log('authorization:' + authorizationHeader); // 'Bearer <TOKEN>'
                    accessToken_1 = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.replace(/^Bearer\s+/, " ");
                    if (accessToken_1 == null) {
                        return [2 /*return*/, res.status(401).send('Unauthorized for action!')];
                    }
                    jwt.verify(accessToken_1 || '', process.env.ACCESS_TOKEN_SECRET || '', function (err, payload) {
                        if (!err && exports.VALID_TOKENS[payload === null || payload === void 0 ? void 0 : payload.username] == accessToken_1)
                            req.user = payload;
                        passedAuthorization = true;
                        return next();
                    });
                    return [3 /*break*/, 3];
                case 1:
                    process.env.AUTHENTICATION_MGMT_METHOD == 'session';
                    expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
                    username = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.username;
                    sessionId = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.sessionId;
                    return [4 /*yield*/, (0, sessionAuthenticator_1.sessionAuthenticate)(sessionId, username, expirationTime, mongoose_1.default)];
                case 2:
                    // Check if user is authenticated
                    if (_c.sent()) {
                        passedAuthorization = true;
                        return [2 /*return*/, next()];
                    }
                    _c.label = 3;
                case 3:
                    if (!passedAuthorization) {
                        return [2 /*return*/, res.status(401).send('Unauthorized for action!')];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.authMiddleware = authMiddleware;
