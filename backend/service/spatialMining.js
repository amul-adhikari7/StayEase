const dbscan = require("../utils/dbscan");
const mongoose = require("mongoose");

// MongoDB model for spatial insights
const spatialInsightsSchema = new mongoose.Schema({
  clusters: Array,
  createdAt: { type: Date, default: Date.now },
});
const SpatialInsights = mongoose.model(
  "SpatialInsights",
  spatialInsightsSchema,
  "spatial_insights"
);

/**
 * Run DBSCAN clustering on hotels and store results in MongoDB
 * @param {Array<{id: string, lat: number, lon: number}>} hotels
 * @param {number} eps
 * @param {number} minPts
 * @returns {Promise}
 */
async function runSpatialMining(hotels, eps = 1, minPts = 3) {
  const clusters = dbscan(hotels, eps, minPts);
  await SpatialInsights.create({ clusters });
  return clusters;
}

/**
 * Get latest spatial insights (clusters)
 */
async function getLatestSpatialInsights() {
  return SpatialInsights.findOne({}, {}, { sort: { createdAt: -1 } });
}

module.exports = { runSpatialMining, getLatestSpatialInsights };
