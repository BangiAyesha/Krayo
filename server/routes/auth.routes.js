const express = require("express");
const router = express.Router();
const passport = require("passport");
const ip = require("ip");
const ipAddress = {};

router.get("/login/success", (req, res) => {
    ipAddress["data"] = ip.address();
    if (req.user) {
        res.json({ error: false, message: "Login Success", user: req.user });
    } else {
        res.json({ error: true, message: "Login fail" });
    }
});

router.get("/login/failed", (req, res) => {
    res.json({ error: true, message: "Login failed" });
});

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${process.env.CLIENT_URL}`,
    })
);

router.get("/logout", (req, res) => {
    req.logOut();
    res.clearCookie("connect.sid", {
        path: process.env.CLIENT_URL,
    });
    req.session = null;
    res.redirect(process.env.CLIENT_URL);
});

module.exports = { router, ipAddress };
