import { Schema, model } from "mongoose";

const ActivitySchema= new Schema({
        id:{type:String},
        activityName:{type:String},
        activityImage:{type:String},
})

export const ActivityModel = model("activities", ActivitySchema);