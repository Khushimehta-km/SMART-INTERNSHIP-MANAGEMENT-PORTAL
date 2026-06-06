const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");


router.post("/mark", async(req,res)=>{

    const attendance = new Attendance(req.body);

    await attendance.save();

    res.json({
        message:"Attendance Marked",
        attendance:attendance
    });

});


router.get("/", async(req,res)=>{

    const data = await Attendance.find();

    res.json(data);

});


module.exports = router;