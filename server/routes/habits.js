import { Router } from "express";
import Habit from "../models/Habit.js";

import { completeHabitHandler } from "../controllers/habitController.js";

const router = Router();

// CREATE
router.post("/", async (req, res) => {
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    try {
        const habits = await Habit.find();
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// READ ONE
router.get("/:id", async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) return res.status(404).json({ error: "Not found" });
        res.json(habit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put("/:id", async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(habit);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// MARK AS COMPLETE & XP award
router.post("/:id/complete", completeHabitHandler, async (req, res) => {
    try {
        const habit = await Habit.findOne({
            _id: req.params.id,
            userId: req.user.userId,
        });
        if (!habit) return res.status(404).json({ message: "Habit not found" });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if already completed today
        const completedToday = habit.completions.some(
            (c) => c.date.getTime() === today.getTime()
        );
        if (completedToday)
            return res.status(400).json({ message: "Already completed today" });

        habit.completions.push({ date: today });
        habit.streak += 1;
        if (habit.streak > habit.longestStreak)
            habit.longestStreak = habit.streak;

        await habit.save();

        res.json({ message: "Habit completed", habit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);
        res.json({ message: "Habit deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
