const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Mentor", "Intern"],
    default: "Intern"
  },
  department: String
});

module.exports = mongoose.model("User", userSchema);