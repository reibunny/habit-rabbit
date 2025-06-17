import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    totalxp: { type: Number, default: 0 },
    avatar: String,
});

export default model("User", userSchema);
