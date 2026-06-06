const express = require("express");
const router = express.Router();

const Report = require("../models/Report");


// Submit report
router.post("/add", async (req,res)=>{

    const report = new Report(req.body);

    await report.save();

    res.json({
        message:"Report Submitted",
        report:report
    });

});


// view reports
router.get("/", async(req,res)=>{

    const reports = await Report.find();

    res.json(reports);

});


module.exports = router;