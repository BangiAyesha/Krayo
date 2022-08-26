const express = require("express");
const greetUserInNative = require("../controllers/data.controller");
const router = express.Router();

router.get("/greet", greetUserInNative);

module.exports = router;
