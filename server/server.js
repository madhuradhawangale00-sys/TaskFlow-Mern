require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

connectDB()

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req,res) => {
    res.send("TaskFlow Backend is running");
});

app.get("/profile", protect,(req,res) => {
    res.json({
        success: true,
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server is running at port ${PORT}`);
    
});