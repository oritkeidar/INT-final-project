"use strict";
exports.__esModule = true;
exports.ActivityModel = void 0;
var mongoose_1 = require("mongoose");
var ActivitySchema = new mongoose_1.Schema({
    id: { type: String },
    activityName: { type: String },
    activityImage: { type: String }
});
exports.ActivityModel = mongoose_1.model("activities", ActivitySchema);
