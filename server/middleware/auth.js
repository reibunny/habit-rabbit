import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).json({ error: "Missing token" });

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);
        if (!user) return res.status(404).json({ error: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(401).json({ error: "Invalid token" });
    }
};
