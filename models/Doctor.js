const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slots: {
        type: [String], // array of time slots
        required: true
    }
});

module.exports = mongoose.model("Doctor", doctorSchema);