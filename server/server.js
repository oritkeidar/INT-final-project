"use strict";
// import express, { Request, Response } from "express";
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
var UserSchema_1 = require("./mongoose/UserSchema");
var Session_1 = require("./class/Session");
var mongoose_1 = require("mongoose");
var ActivitiesSchema_1 = require("./mongoose/ActivitiesSchema");
var Connection_MongoDB_1 = require("./mongoose/Connection_MongoDB");
var Authenticate_1 = require("./guards/Authenticate");
require("dotenv").config();
var expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS);
var port = process.env.PORT;
var authMiddleware = require("./guards/Authenticate").authMiddleware;
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
var multer = require("multer");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var express = require("express");
var admin = require('firebase-admin');
var unless = function (path, middleware) {
    return function (req, res, next) {
        if (path === req.path) {
            return next();
        }
        else {
            return middleware(req, res, next);
        }
    };
};
var serviceAccount = require('./serviceAccount.json');
var dbUrl = "https://int-final-project-default-rtdb.asia-southeast1.firebasedatabase.app/";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: dbUrl,
});
var messaging = admin.messaging();
console.info("Initialized Firebase SDK");
var app = express();
app.use(cors({
    origin: true,
    credentials: true,
    maxAge: 2592000,
}));
app.use(express.json());
app.use("/images", express.static("Images"));
app.use("/getUserAccount", authMiddleware);
(0, Connection_MongoDB_1.default)();
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        callback(null, "".concat(file.originalname, "_").concat(Date.now()));
    },
});
var upload = multer({ storage: storage });
var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "oritjan32@gmail.com",
        pass: process.env.TRANSPORST_GMAIL_PASSWORD,
    },
});
app.put("/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var saltRounds, _a, firstName, lastName, username, hashedPassword, user, actualUser, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                saltRounds = 10;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 7, , 8]);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, username = _a.username;
                return [4 /*yield*/, bcrypt.hash(req.body.password, saltRounds)];
            case 2:
                hashedPassword = _c.sent();
                return [4 /*yield*/, UserSchema_1.UserModel.findOne({
                        userName: username,
                    })];
            case 3:
                user = _c.sent();
                if (!user) return [3 /*break*/, 4];
                res.json({ user: user });
                return [3 /*break*/, 6];
            case 4:
                actualUser = new UserSchema_1.UserModel({
                    firstName: firstName,
                    lastName: lastName,
                    userName: username,
                    password: hashedPassword,
                });
                return [4 /*yield*/, actualUser.save()];
            case 5:
                _c.sent();
                res.send("sign up successfully");
                _c.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                _b = _c.sent();
                res.status(409).send("The user exists, Enter with another email");
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.post("/find-user-email", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                return [4 /*yield*/, UserSchema_1.UserModel.findOne({
                        userName: username,
                    })];
            case 1:
                user = _a.sent();
                res.send({ user: user });
                return [2 /*return*/];
        }
    });
}); });
app.post("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, match, payload, accessToken, refreshToken, session, sessionId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, UserSchema_1.UserModel.findOne({
                        userName: username,
                    })];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password)];
            case 2:
                match = _b.sent();
                if (!!match) return [3 /*break*/, 3];
                res.json(user);
                return [3 /*break*/, 6];
            case 3:
                if (!(process.env.AUTHENTICATION_MGMT_METHOD == "token")) return [3 /*break*/, 4];
                payload = { name: username };
                accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: "15s" });
                console.log("accessToken:" + accessToken);
                refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "");
                Authenticate_1.VALID_TOKENS[username] = accessToken;
                console.log("valid token:" + Authenticate_1.VALID_TOKENS[username]);
                Authenticate_1.REFRESH_TOKENS[username] = refreshToken;
                res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, user: user });
                return [3 /*break*/, 6];
            case 4:
                session = new Session_1.Session(username, expirationTime, mongoose_1.default);
                return [4 /*yield*/, session.getSessionId()];
            case 5:
                sessionId = _b.sent();
                res.cookie("sessionId", sessionId, {
                    maxAge: 432500,
                    httpOnly: true,
                });
                res.cookie("username", username, {
                    maxAge: 432500,
                    httpOnly: true,
                });
                res.status(200).send("Login succesfully!");
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post('/send-fcm', function (req, res) {
    var message = {
        notification: {
            title: 'Your Notification Title',
            body: 'Your Notification Body',
        },
        token: 'Your_FCM_Token',
    };
    messaging
        .send(message)
        .then(function (response) {
        console.log('Successfully sent message:', response);
        res.status(200).json({ success: true });
    })
        .catch(function (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: error.message });
    });
});
app.post("/logout", function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var userDetails, username, sessionId, session, actSession;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(process.env.AUTHENTICATION_MGMT_METHOD == "token")) return [3 /*break*/, 1];
                    userDetails = req.body.userDetails;
                    username = userDetails.userName;
                    delete Authenticate_1.VALID_TOKENS[username];
                    delete Authenticate_1.REFRESH_TOKENS[username];
                    return [3 /*break*/, 4];
                case 1:
                    sessionId = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.sessionId;
                    session = new Session_1.Session(null, expirationTime, mongoose_1.default, sessionId);
                    return [4 /*yield*/, session.getSession()];
                case 2:
                    actSession = _b.sent();
                    return [4 /*yield*/, session.deactivateSession(actSession)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/, res.send("200")];
            }
        });
    });
});
app.get("/getActivities", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var activities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ActivitiesSchema_1.ActivityModel.find()];
                case 1:
                    activities = _a.sent();
                    res.send(activities);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/getUserAccount", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.body.userId;
                    console.log(userId);
                    return [4 /*yield*/, UserSchema_1.UserModel.findOne({
                            _id: userId,
                        })];
                case 1:
                    user = _a.sent();
                    res.json(user);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/update-user/:id", upload.single("image"), function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var image, id, _a, firstName, lastName, address, email, updateUser;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = req.file;
                    id = req.params.id;
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, address = _a.address, email = _a.email;
                    console.log(id, firstName);
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({
                            _id: id,
                        }, { image: image === null || image === void 0 ? void 0 : image.filename, firstName: firstName, lastName: lastName, address: address, email: email })];
                case 1:
                    updateUser = _b.sent();
                    return [4 /*yield*/, (updateUser === null || updateUser === void 0 ? void 0 : updateUser.save())];
                case 2:
                    _b.sent();
                    console.log(updateUser);
                    res.json(updateUser);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/delete-user-image", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, updateUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.body.userId;
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({
                            _id: userId,
                        }, { $set: { image: null } }, { new: true })];
                case 1:
                    updateUser = _a.sent();
                    res.send(updateUser);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/get-activity", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = req.body.userId;
                    return [4 /*yield*/, UserSchema_1.UserModel.findOne({ _id: userId })];
                case 1:
                    user = _a.sent();
                    res.send(user);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/add-activity", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, activityName, userDetails, username, result;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, activityName = _a.activityName, userDetails = _a.userDetails;
                    console.log(activityName);
                    console.log(userDetails);
                    username = userDetails.userName;
                    console.log(username);
                    return [4 /*yield*/, UserSchema_1.UserModel.updateOne({ userName: username }, { $push: { activities: activityName } })];
                case 1:
                    result = _b.sent();
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/delete-activity", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userId, activityName, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userId = _a.userId, activityName = _a.activityName;
                    console.log(userId);
                    console.log(activityName);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({ _id: userId }, { $pull: { activities: activityName } })];
                case 2:
                    user = _b.sent();
                    res.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.error("Error updating document");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post("/add-event", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, date, className, hour, instructorName, userId, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body.eventData, date = _a.date, className = _a.className, hour = _a.hour, instructorName = _a.instructorName;
                    userId = req.body.userId;
                    console.log("events detailes: " + date, className, hour, instructorName, userId);
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({ _id: userId }, { $push: { events: { date: date, hour: hour, className: className, instructorName: instructorName } } })];
                case 1:
                    user = _b.sent();
                    res.json(user);
                    return [2 /*return*/];
            }
        });
    });
});
app.delete('/delete-event/:userId/:eventId', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, eventId, user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                console.log(userId);
                eventId = req.params.eventId;
                console.log(eventId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, UserSchema_1.UserModel.findById(userId)];
            case 2:
                user = _a.sent();
                user.events = user === null || user === void 0 ? void 0 : user.events.filter(function (event) { return event._id != eventId; });
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                res.json(user);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).json({ error: 'Failed to delete event' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/add-weight/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, weighingDate, weight, fatPercentage, id, userUpdate, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, weighingDate = _a.weighingDate, weight = _a.weight, fatPercentage = _a.fatPercentage;
                    id = req.params.id;
                    console.log("id is :" + id);
                    console.log(weight);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({
                            _id: id,
                        }, {
                            $push: { weighings: { weighingDate: weighingDate, weight: weight, fatPercentage: fatPercentage } },
                        })];
                case 2:
                    userUpdate = _b.sent();
                    res.status(200).json(userUpdate);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    console.log("error updatind the user");
                    res.status(401).send();
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.post("/forgot-password", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, payload, accessToken, resetToken, user, emailContent, mailOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = req.body.email;
                    if (!(process.env.AUTHENTICATION_MGMT_METHOD == "token")) return [3 /*break*/, 2];
                    payload = { userName: email };
                    accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "");
                    resetToken = accessToken;
                    console.log(resetToken);
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({ userName: email }, {
                            $set: {
                                resetToken: resetToken,
                                resetTokenExpiry: new Date(Date.now() + 3600000),
                            },
                        })];
                case 1:
                    user = _a.sent();
                    emailContent = "\n  Hello ".concat(user === null || user === void 0 ? void 0 : user.firstName, ",\n\n  You've requested to reset your password. Click the link below to reset it:\n\n  http://localhost:3001/reset-password/").concat(resetToken, "\n\n  If you didn't request this, please ignore this email.\n");
                    mailOptions = {
                        from: "wealth world",
                        to: email,
                        subject: "Password Reset Request",
                        text: emailContent,
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.error("Error sending email: ", error);
                        }
                        else {
                            console.log("Email sent: ", info.response);
                        }
                    });
                    res.status(200).send(resetToken);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
});
app.post("/reset-password", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var saltRounds, token, newPassword, hashedNewPassword, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    saltRounds = 10;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    token = req.body.token;
                    console.log("token:" + token);
                    newPassword = req.body.newPassword;
                    console.log("Newpassword: " + newPassword);
                    return [4 /*yield*/, bcrypt.hash(newPassword, saltRounds)];
                case 2:
                    hashedNewPassword = _a.sent();
                    return [4 /*yield*/, UserSchema_1.UserModel.findOneAndUpdate({ resetToken: token }, {
                            $set: {
                                password: hashedNewPassword,
                            },
                        })];
                case 3:
                    _a.sent();
                    res.send("success");
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.log("error");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
app.listen(port, function () {
    console.log("server is running on port ".concat(port));
});
