import { Schema, model } from "mongoose";

const habitSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: String,
    discipline: String,
    frequency: String,
    isActive: Boolean,
    streak: Number,
    longestStreak: Number,
    difficulty: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default model("Habit", habitSchema);
