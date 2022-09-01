const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login/success", authController.loginSuccess);

router.get("/login/failed", authController.loginFail);

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

router.get("/logout", authController.logout);

module.exports = router;
