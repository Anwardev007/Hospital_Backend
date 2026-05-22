const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
const { isAuthenticated } = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, appointmentController.addAppointment);

router.get("/", isAuthenticated, appointmentController.getAppointments);

router.delete("/:id", isAuthenticated, appointmentController.deleteAppointment);

router.put("/:id", isAuthenticated, appointmentController.updateAppointment);

router.get("/slots", isAuthenticated, appointmentController.getAvailableSlots);

router.get("/check", isAuthenticated, appointmentController.checkAvailability);

module.exports = router;