const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const dataRoutes = require("./data.routes");

router.use("/auth", authRoutes);
router.use("/data", dataRoutes);

module.exports = router;
