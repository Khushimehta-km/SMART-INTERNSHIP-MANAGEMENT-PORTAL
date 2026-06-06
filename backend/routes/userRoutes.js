const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login or Register user
router.post("/login", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            if (user.password !== password) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            return res.json({
                message: "Login successful",
                user: user
            });
        }

        user = new User({ name, email, password, role });
        await user.save();

        res.json({
            message: "User registered successfully",
            user: user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

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
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;