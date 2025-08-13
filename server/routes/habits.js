import { Router } from "express";
import Habit from "../models/Habit.js";
import { requireAuth } from "../middleware/auth.js";
import { completeHabitHandler } from "../controllers/habitController.js";
import { completeHabit } from "../utils/levelSystem.js";

const router = Router();

// Apply requireAuth middleware to all routes
router.use(requireAuth);

// CREATE
router.post("/", async (req, res) => {
    try {
        const habit = await Habit.create({ ...req.body, userId: req.user._id });
        res.status(201).json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get("/:id", async (req, res) => {
    try {
        const habit = await Habit.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!habit) return res.status(404).json({ error: "Habit not found" });
        res.json(habit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const habit = await Habit.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            req.body,
            { new: true }
        );
        if (!habit) return res.status(404).json({ error: "Habit not found" });
        res.json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// MARK AS COMPLETE & XP award
router.post("/:id/complete", async (req, res) => {
    const habitId = req.params.id;
    const userId = req.user._id;

    try {
        const habit = await Habit.findOne({ _id: habitId, userId });

        if (!habit) return res.status(404).json({ message: "Habit not found" });

        const now = new Date();
        const lastCompletedDate = new Date(habit.lastCompleted);

        // Check if already completed today
        const isSameDay =
            lastCompletedDate.getFullYear() === now.getFullYear() &&
            lastCompletedDate.getMonth() === now.getMonth() &&
            lastCompletedDate.getDate() === now.getDate();

        if (isSameDay) {
            return res
                .status(400)
                .json({ message: "Habit already completed today" });
        }

        habit.lastCompleted = now;
        habit.streak += 1;

        if (!habit.longestStreak || habit.streak > habit.longestStreak) {
            habit.longestStreak = habit.streak;
        }
        const result = await completeHabit(userId, habitId);

        await habit.save();

        res.status(200).json({
            message: "Habit completed!",
            xpGained: result.xpGained,
            newLevel: result.newLevel,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });
        if (!habit) return res.status(404).json({ error: "Habit not found" });
        res.json({ message: "Habit deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
