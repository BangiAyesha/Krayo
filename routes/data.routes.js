const express = require("express");
const greetUserInNative = require("../controllers/data.controller");
const authenticateToken = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/greet", authenticateToken, greetUserInNative);

module.exports = router;
