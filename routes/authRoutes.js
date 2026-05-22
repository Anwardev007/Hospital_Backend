const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/User");

// routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// session check

router.get("/session", async (req, res) => {

    if (!req.session.userId) {
        return res.json({ loggedIn: false });
    }

    const user = await User.findById(req.session.userId);

    res.json({
        loggedIn: true,
        name: user.name
    });

});

module.exports = router;