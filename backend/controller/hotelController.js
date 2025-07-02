const QuadTree = require("../utils/quadtree");
const haversineDistance = require("../utils/haversine");
const findNearestHotels = require("../utils/dijkstra");
const dbscan = require("../utils/dbscan");
const isInKathmandu = require("../utils/isInKathmandu");
const Room = require("../models/roomModel");

// GET /api/hotels/nearby?lat=...&lon=...&radius=...
async function getNearbyHotels(req, res) {
  try {
    const { lat, lon, radius = 3 } = req.query;
    if (!lat || !lon)
      return res.status(400).json({ message: "lat/lon required" });
    if (!isInKathmandu(Number(lat), Number(lon))) {
      return res.status(400).json({ message: "Location is outside Kathmandu" });
    }
    // Fetch all hotels/rooms with coordinates
    const rooms = await Room.find({
      lat: { $exists: true },
      lon: { $exists: true },
    });
    const hotels = rooms.map((r) => ({
      id: r._id.toString(),
      name: r.hotelName,
      lat: r.lat,
      lon: r.lon,
      rating: r.rating || null,
      price: r.price || null,
    }));
    // QuadTree spatial filter
    const boundary = {
      minLat: 27.636,
      minLon: 85.27,
      maxLat: 27.7721,
      maxLon: 85.4505,
    };
    const qt = new QuadTree(boundary);
    hotels.forEach((h) => qt.insert(h));
    const candidates = qt.searchNearby(
      Number(lat),
      Number(lon),
      Number(radius)
    );
    // Dijkstra ranking
    const ranked = findNearestHotels(
      candidates,
      { lat: Number(lat), lon: Number(lon) },
      5
    ).map((h) => ({
      ...h,
      distance: haversineDistance(
        { lat: Number(lat), lon: Number(lon) },
        { lat: h.lat, lon: h.lon }
      ),
    }));
    // Optional: DBSCAN clustering
    let clusters = [];
    if (candidates.length > 0) {
      clusters = dbscan(candidates, 1, 3);
      // Assign clusterId to each hotel
      ranked.forEach((hotel) => {
        const clusterIdx = clusters.findIndex((c) =>
          c.members.some((m) => m.id === hotel.id)
        );
        hotel.clusterId = clusterIdx >= 0 ? clusterIdx : null;
      });
    }
    // Sort by distance
    ranked.sort((a, b) => a.distance - b.distance);
    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getNearbyHotels };
