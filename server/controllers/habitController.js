import { completeHabit, getUserProgress } from "../utils/levelSystem.js";

export const completeHabitHandler = async (req, res) => {
    const userId = req.user._id;
    const habitId = req.params.id;

    try {
        const result = await completeHabit(userId, habitId);
        res.status(200).json({
            message: "Habit completed!",
            xpGained: result.xpGained,
            newLevel: result.newLevel,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getProgressHandler = async (req, res) => {
    try {
        const userId = req.user._id;
        const progress = await getUserProgress(userId);
        res.status(200).json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
