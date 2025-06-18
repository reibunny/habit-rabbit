import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    totalxp: { type: Number, default: 0 },
    avatar: String,
});

export default model("User", userSchema);
