const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  internName: String,
  date: String,
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);