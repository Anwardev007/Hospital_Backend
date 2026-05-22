const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    userId: String,
    doctor: String,
    date: String,
    time: String,
    symptoms: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);