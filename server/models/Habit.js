import { Schema, model } from "mongoose";

const habitSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: { type: String, required: true },
    discipline: {
        type: String,
        required: true,
        enum: ["clarity", "intellect", "body", "creativity", "expression"],
    },
    frequency: {
        type: String,
        required: true,
        default: "daily",
        enum: ["daily", "weekly"],
    },
    isActive: { type: Boolean, default: true },
    streak: { type: Number, default: 0 },
    longestStreak: Number,
    difficulty: {
        type: String,
        default: "easy",
        enum: ["easy", "medium", "hard"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    lastCompleted: {
        type: Date,
        default: null,
    },
});

export default model("Habit", habitSchema);
