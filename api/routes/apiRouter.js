const express = require("express");
const router = express.Router();

const statisticController = require("../controllers/statisticController");
const geoIpController = require("../controllers/geoIpController");

router.get("/api/statistics", statisticController.getStats);
router.post("/api/ip", geoIpController.getIpInfo);

module.exports = router;
