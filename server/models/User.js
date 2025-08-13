import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { THEME_OPTIONS } from "../../client/src/constants/themes.js";

const validThemes = THEME_OPTIONS.map((theme) => theme.value);

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    level: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    totalxp: { type: Number, default: 0 },
    theme: {
        type: String,
        default: "cotton-candy",
        enum: validThemes,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

export default model("User", userSchema);
