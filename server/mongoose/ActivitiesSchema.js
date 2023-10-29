"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityModel = void 0;
var mongoose_1 = require("mongoose");
var ActivitySchema = new mongoose_1.Schema({
    id: { type: String },
    activityName: { type: String },
    activityImage: { type: String },
});
exports.ActivityModel = (0, mongoose_1.model)("activities", ActivitySchema);
