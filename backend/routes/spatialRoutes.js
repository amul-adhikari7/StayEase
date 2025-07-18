const express = require("express");
const router = express.Router();
const { getLatestSpatialInsights } = require("../service/spatialMining");

// GET /api/spatial/hotspots
router.get("/hotspots", async (req, res) => {
  try {
    const insights = await getLatestSpatialInsights();
    if (!insights)
      return res.status(404).json({ message: "No spatial insights found" });
    res.json(insights.clusters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
