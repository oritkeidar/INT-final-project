"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    password: { type: String },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
    address: { type: String },
    date: { type: Date },
    image: { type: String },
    activities: [{ type: String }]
});
exports.UserModel = mongoose_1.model("userModle", UserSchema);
