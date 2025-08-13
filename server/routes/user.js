import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { getUserProgress } from "../utils/levelSystem.js";
import User from "../models/User.js";
import { THEME_OPTIONS } from "../../client/src/constants/themes.js";

const router = Router();

router.get("/progress", requireAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        const progress = await getUserProgress(userId);

        res.json({
            username: user.username,
            level: progress.level,
            currentXP: user.xp,
            toNextLevel: progress.toNextLevel,
            progressPercent: progress.progressPercent,
        });
    } catch (err) {
        console.error("Progress Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.put("/theme", requireAuth, async (req, res) => {
    try {
        const { theme } = req.body;
        const userId = req.user._id;

        const validThemes = THEME_OPTIONS.map((theme) => theme.value);

        if (!validThemes.includes(theme)) {
            return res.status(400).json({ error: "Invalid theme" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { theme },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Theme updated successfully", theme: user.theme });
    } catch (err) {
        console.error("Theme update error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

export default router;
