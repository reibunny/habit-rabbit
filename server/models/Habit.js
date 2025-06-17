import { Schema, model } from "mongoose";

const habitSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: { type: String, default: "Meditate for 10 mins" },
    discipline: { type: String, default: "Mind" },
    frequency: { type: String, default: "daily" },
    isActive: { type: Boolean, default: true },
    streak: { type: Number, default: 0 },
    longestStreak: Number,
    difficulty: { type: String, default: "easy" },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastCompleted: {
        type: Date,
        default: null,
    },
});

export default model("Habit", habitSchema);
