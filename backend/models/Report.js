const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  internName: String,
  date: String,
  taskTitle: String,
  workDone: String,
  status: {
    type: String,
    default: "Submitted"
  }
});

module.exports = mongoose.model("Report", reportSchema);