import mongoose, { connections } from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now},
    subscriptionPlan: {type: String, default: "free"},
    subscriptionDate: {type: Date, default: Date.now()},
    sessionId: {type: String, default: ""},
    lastLoginDate: {type: Number, default:  Number((new Date().getFullYear()) + ("0" + (new Date().getMonth()+1)).slice(-2) + ("0" + new Date().getDate()).slice(-2))},
    noofQuestions: {type: Number, default: 0},
    connections: [{
        userId: String,
        userName: String,
    }]
})

export default mongoose.model("User", userSchema)