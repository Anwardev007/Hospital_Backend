const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
exports.register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: "Registered successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};


// LOGIN
exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // SESSION SET
        req.session.userId = user._id;

        req.session.save(() => {
            res.json({ message: "Login successful" });
        });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }

};


// LOGOUT
exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.json({ message: "Logged out" });
    });

};