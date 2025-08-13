import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();

import { requireAuth } from "../middleware/auth.js";

router.get("/me", requireAuth, (req, res) => {
    res.json(req.user);
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (password.length < 6) {
        return res
            .status(400)
            .json({ error: "Password must be at least 6 characters" });
    }

    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({ message: "User registered", _id: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.json({ token, _id: user._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/logout", requireAuth, (req, res) => {
    res.json({ message: "Logout successful" });
});

export default router;
