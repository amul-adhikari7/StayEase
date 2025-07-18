// Test script to load sample_data/rooms.json and run QuadTree, Haversine, Dijkstra
const fs = require("fs");
const path = require("path");
const QuadTree = require("./utils/quadtree");
const haversineDistance = require("./utils/haversine");
const findNearestHotels = require("./utils/dijkstra");
const dbscan = require("./utils/dbscan");
const isInKathmandu = require("./utils/isInKathmandu");

// Load sample data
const dataPath = path.join(__dirname, "sample_data", "rooms.json");
const hotels = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Simulate user location in Kathmandu
const userLocation = { lat: 27.715, lon: 85.315 };
console.log("User location:", userLocation);
console.log(
  "Is in Kathmandu:",
  isInKathmandu(userLocation.lat, userLocation.lon)
);

// QuadTree bounding box for Kathmandu
const boundary = {
  minLat: 27.636,
  minLon: 85.27,
  maxLat: 27.7721,
  maxLon: 85.4505,
};
const qt = new QuadTree(boundary);
hotels.forEach((h) => qt.insert(h));

// Find hotels within 2km radius
const radius = 2;
const candidates = qt.searchNearby(userLocation.lat, userLocation.lon, radius);
console.log(
  `Hotels within ${radius}km:`,
  candidates.map((h) => h.name)
);

// Dijkstra ranking
const ranked = findNearestHotels(candidates, userLocation, 5).map((h) => ({
  ...h,
  distance: haversineDistance(userLocation, { lat: h.lat, lon: h.lon }),
}));
ranked.sort((a, b) => a.distance - b.distance);
console.log("Top 5 nearest hotels:");
ranked.forEach((h) => console.log(`${h.name} (${h.distance.toFixed(2)} km)`));

// Optional: DBSCAN clustering
const clusters = dbscan(hotels, 1, 3);
console.log(
  "Clusters:",
  clusters.map((c, i) => ({
    cluster: i,
    members: c.members.map((m) => m.name),
  }))
);
