import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

import habitsRouter from "./routes/habits.js";
import config from "./config.js";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/habits", habitsRouter);

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
