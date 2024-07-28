import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo"
import { connectDB } from "./config/db.js";
import "./config/passport.js";
import passport from "passport";
import { configDotenv } from "dotenv";
configDotenv();

import authRoutes from "./routes/authRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!", error: err.message });
  });

app.listen(PORT, () => {
    console.log("App listening on port : ", PORT);
})

export default app;