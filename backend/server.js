const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Mindlabz Internship Management Portal Running");
});

app.get("/api/stats", async (req, res) => {
    try {
        res.json({
            users: 0,
            reports: 0,
            attendance: 0,
            feedback: 0
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/feedback", feedbackRoutes);


// MongoDB connection
mongoose.connect("mongodb+srv://khushim1626_db_user:VijayRenu@cluster0.tlzazh5.mongodb.net/?appName=Cluster0")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});