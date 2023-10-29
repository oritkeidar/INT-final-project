"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    id: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    oldPasswords: [{ type: String }],
    resetToken: String,
    resetTokenExpiry: Date,
    address: String,
    date: { type: Date },
    image: String,
    activities: [{ type: String }],
    events: [{ date: String, hour: String, className: String, instructorName: String }],
    weighings: [{ weighingDate: String, weight: Number, fatPercentage: Number }]
});
exports.UserModel = (0, mongoose_1.model)("userModle", UserSchema);
