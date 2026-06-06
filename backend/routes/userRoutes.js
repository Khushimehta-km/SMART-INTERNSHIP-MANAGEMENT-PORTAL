const express = require("express");
const router = express.Router();
const User = require("../models/User");


// Add user
router.post("/add", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.json({
            message: "User added successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


// Get all users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json(users);
});


module.exports = router;