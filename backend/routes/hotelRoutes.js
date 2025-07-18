const express = require("express");
const router = express.Router();
const { getNearbyHotels } = require("../controller/hotelController");

// GET /api/hotels/nearby
router.get("/nearby", getNearbyHotels);

module.exports = router;
