"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSchema_1 = require("./mongoose/UserSchema");
const Connection_MongoDB_1 = __importDefault(require("./mongoose/Connection_MongoDB"));
const Session_1 = require("./class/Session");
const mongoose_1 = __importDefault(require("mongoose"));
const Authenticate_1 = require("./guards/Authenticate");
const ActivitiesSchema_1 = require("./mongoose/ActivitiesSchema");
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv").config();
const multer = require('multer');
const validator = require('validator');
const cors = require("cors");
const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS);
const port = process.env.PORT;
const unless = function (path, middleware) {
    return function (req, res, next) {
        if (path === req.path) {
            return next();
        }
        else {
            return middleware(req, res, next);
        }
    };
};
app.use(['/getUserAccount', '/getUserProfile', '/update-user', '/delet-user-image'], Authenticate_1.authMiddleware);
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./Images");
    },
    filename: function (req, file, callback) {
        // console.log(file);
        callback(null, `${file.originalname}_${Date.now()}`);
    },
});
const upload = multer({ storage });
app.use(cors({ credentials: true,
    origin: true,
    maxAge: 2592000,
    optionSuccessStatus: 200, }));
app.use(express.json());
app.use("/images", express.static('Images'));
Connection_MongoDB_1.default();
app.put("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const hashedPassword = yield bcrypt.hash(req.body.password, saltRounds);
        const user = yield UserSchema_1.UserModel.findOne({
            userName: username
        });
        if (user) {
            res.json({ user });
        }
        else {
            const actualUser = new UserSchema_1.UserModel({
                firstName: firstName,
                lastName: lastName,
                userName: username,
                password: hashedPassword
            });
            yield actualUser.save();
            res.send('sign up successfully');
        }
    }
    catch (_a) {
        res.status(409).send("The user exists, Enter with another email");
    }
}));
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const saltRounds = 10;
    const hashedPassword = yield bcrypt.hash(password, saltRounds);
    const user = yield UserSchema_1.UserModel.findOne({
        userName: username
    });
    if (!user) {
        res.status(401).send("User does not exist on system, please register");
    }
    const match = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!match) {
        res.status(401).send('Incorrect password');
    }
    else {
        //  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
        const payload = { name: username };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '15s' });
        console.log("accessToken:" + accessToken);
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || '');
        Authenticate_1.VALID_TOKENS[username] = accessToken;
        console.log('valid token:' + Authenticate_1.VALID_TOKENS[username]);
        Authenticate_1.REFRESH_TOKENS[username] = refreshToken;
        res.status(200).json({ accessToken, refreshToken, user });
        // } 
        // else{
        //   const session = new Session(username, expirationTime, mongoose);
        //     // this class saves the session in mongo behind the scenes - in Session constructor
        //     const sessionId = await session.getSessionId();
        //     res.cookie("sessionId", sessionId, {
        //       maxAge: 432500,
        //       httpOnly: true,
        //     });
        //     res.cookie("username", username, {
        //       maxAge: 432500,
        //       httpOnly: true,
        //     });
        //     res.status(200).send("Login succesfully!");
        // }
    }
    //NOTE: Why create new session if session exists in DB??
}));
app.post("/token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (process.env.AUTHENTICATION_MGMT_METHOD == "token") {
        const refreshToken = (_b = req.body) === null || _b === void 0 ? void 0 : _b.refreshToken;
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "", (err, payload) => {
                if (!err) {
                    const username = payload.name;
                    if (Authenticate_1.REFRESH_TOKENS[username] == refreshToken) {
                        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: `${expirationTime}h` });
                        return res.status(200).json({ accessToken });
                    }
                }
            });
        }
    }
    return res.status(401).send("Unauthorized for this action!");
}));
app.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
        const username = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.name;
        console.log('username:' + username);
        delete Authenticate_1.VALID_TOKENS[username];
        delete Authenticate_1.REFRESH_TOKENS[username];
    }
    else {
        const sessionId = (_d = req.cookies) === null || _d === void 0 ? void 0 : _d.sessionId;
        const session = new Session_1.Session(null, expirationTime, mongoose_1.default, sessionId);
        const actSession = yield session.getSession();
        yield session.deactivateSession(actSession);
    }
    return res.send('200');
}));
app.get('/getActivities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const activities = yield ActivitiesSchema_1.ActivityModel.find();
    res.send(activities);
    console.log(activities);
}));
app.get('/getUserAccount', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = Authenticate_1.getUsernameByReq(req);
    // console.log(username)
    const user = yield UserSchema_1.UserModel.findOne({
        userName: "oritjan32@gmail.com",
    });
    console.log(user);
    res.json(user);
}));
app.post("/update-user", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const { firstName, lastName, address, email } = req.body;
    console.log(firstName, lastName, email, address);
    const username = Authenticate_1.getUsernameByReq(req);
    // save new user data in database - by username
    yield UserSchema_1.UserModel.updateOne({
        userName: "oritjan32@gmail.com",
    }, { image: image === null || image === void 0 ? void 0 : image.filename, firstName, lastName, address, email });
    res.status(200).send("User updated successfully!");
}));
app.post("/delet-user-image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUser = yield UserSchema_1.UserModel.findOneAndUpdate({
        userName: "oritjan32@gmail.com"
    }, { $set: { image: null } }, { new: true });
    res.send(updateUser);
}));
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});