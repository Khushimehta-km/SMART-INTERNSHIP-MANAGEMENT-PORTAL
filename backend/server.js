const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Mindlabz Internship Management Portal Running");
});


// API routes
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/feedback", feedbackRoutes);


// paste your mongodb string here
mongoose.connect("mongodb+srv://khushim1626_db_user:VijayRenu@cluster0.tlzazh5.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("MongoDB Connected Successfully");
})
.catch((err)=>{
    console.log(err);
});


app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});