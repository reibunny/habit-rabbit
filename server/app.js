import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

import habitsRouter from "./routes/habits.js";
import authRoutes from "./routes/auth.js";

import config from "./config.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/habits", habitsRouter);
app.use("/api/auth", authRoutes);

connect(config.mongoURI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(config.port, () =>
            console.log(`Server running on port ${config.port}`)
        );
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
