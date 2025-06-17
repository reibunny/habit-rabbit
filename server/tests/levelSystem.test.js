import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";

import Habit from "../models/Habit.js";
import User from "../models/User.js";

import { levelXP, completeHabit, getXPForHabit } from "../utils/levelSystem.js";
import { connectTestDB, disconnectTestDB, clearDatabase } from "./setup.js";

describe("XP & Level System", () => {
    beforeAll(connectTestDB);
    afterEach(clearDatabase);
    afterAll(disconnectTestDB);

    it("should give the correct amount of XP including streak bonus", async () => {
        const user = await User.create({ totalxp: 0, level: 0 });
        const habit = await Habit.create({ difficulty: "medium", streak: 1 });

        const result = await completeHabit(user._id, habit._id);

        expect(result.xpGained).toEqual(27); // 25 base + 2 streak (streak becomes 1 after increment)
        const updatedUser = await User.findById(user._id);
        expect(updatedUser.xp).toEqual(27);
    });

    it("should level up the user when XP threshold is reached", async () => {
        const user = await User.create({ totalxp: 90, level: 0 });
        const habit = await Habit.create({ difficulty: "medium", streak: 0 });

        await completeHabit(user._id, habit._id);
        const updatedUser = await User.findById(user._id);

        expect(updatedUser.level).toBeGreaterThan(0);
        expect(updatedUser.level).toEqual(1);
    });

    it("should hold the remaining earned XP as current XP", async () => {
        const user = await User.create({ totalxp: 90, level: 0 });
        const habit = await Habit.create({ difficulty: "medium", streak: 0 });

        await completeHabit(user._id, habit._id);
        const updatedUser = await User.findById(user._id);

        expect(updatedUser.xp).toEqual(15);
    });
});
