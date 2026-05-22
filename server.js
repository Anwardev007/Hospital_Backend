const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const Doctor = require("./models/Doctor");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(session({
    secret: "hospital-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

const defaultDoctors = [
    {
        name: "Dr. Ahmed - Cardiologist",
        slots: ["10:00", "11:00", "12:00"]
    },
    {
        name: "Dr. Sarah - Neurologist",
        slots: ["10:00", "11:00", "12:00"]
    },
    {
        name: "Dr. Ali - General Physician",
        slots: ["10:00", "11:00", "12:00"]
    }
];

// INSERT IF NOT EXISTS
async function seedDoctors() {

    for (let doc of defaultDoctors) {

        const exists = await Doctor.findOne({ name: doc.name });

        if (!exists) {
            await Doctor.create(doc);
            console.log(doc.name + " added");
        }

    }

}

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/hospitalSystem")
    .then(async () => {
        console.log("MongoDB Connected");
        await seedDoctors();
    })
    .catch(err => console.log(err));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});