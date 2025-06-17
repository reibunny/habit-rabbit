import Habit from "../models/Habit.js";
import User from "../models/User.js";

import cron from "node-cron";

const difficultyAward = {
    easy: 10,
    medium: 25,
    hard: 50,
};

const levelXP = (level) => 20 * level ** 2 + 80 * level;

const calculateLevelFromXP = (xp) => {
    let level = 1;
    while (xp >= levelXP(level)) {
        level++;
    }
    return level - 1;
};

const xpToNextLevel = (currentXP) => {
    const currentLevel = calculateLevelFromXP(currentXP);
    const nextLevelXP = levelXP(currentLevel + 1);
    return nextLevelXP - currentXP;
};

const getXPForHabit = (habit) => {
    const baseXP = difficultyAward[habit.difficulty];
    const streakBonus = habit.streak * 2;
    return baseXP + streakBonus;
};

const completeHabit = async (userId, habitId) => {
    const habit = await Habit.findById(habitId);
    const user = await User.findById(userId);

    if (!habit || !user) throw new Error("Habit or User not found");

    habit.lastCompleted = new Date();
    await habit.save();

    const xpGained = getXPForHabit(habit);

    user.totalxp = (user.totalxp || 0) + xpGained;
    user.level = calculateLevelFromXP(user.totalxp);
    user.xp = user.totalxp - levelXP(user.level);
    await user.save();

    habit.streak += 1;

    return { xpGained, newLevel: user.level };
};

cron.schedule("0 0 * * *", async () => {
    const habits = await Habit.find();
    const now = new Date();

    for (const habit of habits) {
        const last = new Date(habit.lastCompleted);
        const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));

        if (diff > 1) {
            habit.streak = 0;
            await habit.save();
        }
    }
});

const getUserProgress = async (userId) => {
    const user = await User.findById(userId);
    const level = calculateLevelFromXP(user.xp);
    const progress =
        ((user.xp - levelXP(level)) / (levelXP(level + 1) - levelXP(level))) *
        100;
    return {
        level,
        xp: user.xp,
        toNextLevel: xpToNextLevel(user.xp),
        progressPercent: progress.toFixed(2),
    };
};

export {
    completeHabit,
    calculateLevelFromXP,
    getUserProgress,
    xpToNextLevel,
    levelXP,
};
