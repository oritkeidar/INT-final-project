import { Schema, model } from "mongoose";

const UserSchema= new Schema({
        id:String,
        firstName:String,
        lastName:String,
        userName:String,
        password:String,
        oldPasswords:[{type:String}],
        resetToken:String,
        resetTokenExpiry:Date,
        address:String,
        date:{type:Date},
        image:String,
        activities:[{type:String}],
        events: [{date: String, hour: String, className: String, instructorName:String}],
        weighings:[{weighingDate:String, weight:Number, fatPercentage:Number}]
})

export const UserModel = model("userModle", UserSchema);