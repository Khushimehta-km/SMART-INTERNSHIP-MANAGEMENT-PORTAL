const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  internName: String,
  mentorName: String,
  comment: String,
  rating: Number,
  date: String
});

module.exports = mongoose.model("Feedback", feedbackSchema);