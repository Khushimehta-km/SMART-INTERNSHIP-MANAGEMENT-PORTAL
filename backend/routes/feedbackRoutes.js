const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");


router.post("/add", async(req,res)=>{

    const feedback = new Feedback(req.body);

    await feedback.save();

    res.json({
        message:"Feedback Added",
        feedback:feedback
    });

});


router.get("/", async(req,res)=>{

    const feedbacks = await Feedback.find();

    res.json(feedbacks);

});


module.exports = router;