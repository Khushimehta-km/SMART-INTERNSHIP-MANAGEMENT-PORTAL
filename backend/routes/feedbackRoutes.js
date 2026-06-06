const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

// Add feedback
router.post("/add", async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();

        res.json({
            success: true,
            message: "Feedback added successfully",
            feedback: feedback
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all feedback
router.get("/", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;