import { Schema, model } from "mongoose";

const habitSchema = new Schema({
    userId: Schema.Types.ObjectId,
    title: { type: String, default: "Meditate for 10 mins", required: true },
    discipline: { type: String, default: "Mind", required: true },
    frequency: { type: String, default: "daily" },
    isActive: { type: Boolean, default: true },
    streak: { type: Number, default: 0 },
    longestStreak: Number,
    difficulty: { type: String, default: "easy" },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    lastCompleted: {
        type: Date,
        default: null,
        required: false,
    },
});

export default model("Habit", habitSchema);
