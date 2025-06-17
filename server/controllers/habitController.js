import { completeHabit } from "../utils/levelSystem.js";

export const completeHabitHandler = async (req, res) => {
    const userId = req.body.userId;
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
