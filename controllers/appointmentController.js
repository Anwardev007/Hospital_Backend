const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");


// ADD APPOINTMENT
exports.addAppointment = async (req, res) => {

    try {

        const userId = req.session.userId;
        const { doctor, date, time, symptoms } = req.body;

        const Doctor = require("../models/Doctor");

        const doctorData = await Doctor.findOne({ name: doctor });

        if (!doctorData) {
            return res.status(400).json({ message: "Doctor not found" });
        }

        const slots = doctorData.slots;

        // CHECK EXISTING BOOKINGS
        const existingAppointments = await Appointment.find({ doctor, date });

        if (existingAppointments.length >= slots.length) {
            return res.status(400).json({ message: "No slots available for this day" });
        }

        // CHECK SAME TIME SLOT
        const alreadyBooked = existingAppointments.find(app => app.time === time);

        if (alreadyBooked) {
            return res.status(400).json({ message: "This time slot is already booked" });
        }

        const appointment = new Appointment({
            userId,
            doctor,
            date,
            time,
            symptoms
        });

        await appointment.save();

        res.json({ message: "Appointment booked successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};


// GET APPOINTMENTS
exports.getAppointments = async (req, res) => {

    try {

        const userId = req.session.userId;

        const appointments = await Appointment.find({ userId });

        res.json(appointments);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};


// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {

    try {

        await Appointment.findByIdAndDelete(req.params.id);

        res.json({ message: "Appointment cancelled" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};


// UPDATE APPOINTMENT
exports.updateAppointment = async (req, res) => {

    try {

        const { doctor, date, time, symptoms } = req.body;

        await Appointment.findByIdAndUpdate(req.params.id, {
            doctor,
            date,
            time,
            symptoms
        });

        res.json({ message: "Appointment updated" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};


// GET AVAILABLE SLOTS
exports.getAvailableSlots = async (req, res) => {

    try {

        const { doctor, date } = req.query;

        const doctorData = await Doctor.findOne({ name: doctor });

        if (!doctorData) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const allSlots = doctorData.slots;

        const booked = await Appointment.find({ doctor, date });

        const bookedTimes = booked.map(a => a.time);

        const available = allSlots.filter(slot => !bookedTimes.includes(slot));

        res.json(available);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};

exports.checkAvailability = async (req, res) => {

    try {

        const { doctor, date } = req.query;

        const doctorData = await Doctor.findOne({ name: doctor });

        if (!doctorData) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const totalSlots = doctorData.slots.length;

        const booked = await Appointment.find({ doctor, date });

        if (booked.length >= totalSlots) {
            return res.json({ full: true });
        }

        res.json({ full: false });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};