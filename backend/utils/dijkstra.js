const haversineDistance = require("./haversine");

/**
 * Dijkstra's algorithm to find shortest paths from a source node to all other nodes.
 * @param {Object[]} hotels - Array of hotel objects with { id, lat, lon }
 * @param {{lat: number, lon: number}} userLocation - User's current location
 * @param {number} topN - Number of nearest hotels to return
 * @returns {Object[]} Top N nearest hotels with their distances
 */
function findNearestHotels(hotels, userLocation, topN = 3) {
  // Build a graph: nodes = hotels + user, edges = haversine distance
  const nodes = [{ id: "user", ...userLocation }, ...hotels];
  const distances = {};
  const visited = {};
  const prev = {};

  // Initialize distances
  nodes.forEach((node) => {
    distances[node.id] = node.id === "user" ? 0 : Infinity;
    visited[node.id] = false;
    prev[node.id] = null;
  });

  for (let i = 0; i < nodes.length; i++) {
    // Find unvisited node with smallest distance
    let minDist = Infinity;
    let minNode = null;
    for (const node of nodes) {
      if (!visited[node.id] && distances[node.id] < minDist) {
        minDist = distances[node.id];
        minNode = node;
      }
    }
    if (!minNode) break;
    visited[minNode.id] = true;

    // Update distances to neighbors (all hotels)
    for (const neighbor of hotels) {
      if (visited[neighbor.id]) continue;
      const dist = haversineDistance(
        { lat: minNode.lat, lon: minNode.lon },
        { lat: neighbor.lat, lon: neighbor.lon }
      );
      if (distances[minNode.id] + dist < distances[neighbor.id]) {
        distances[neighbor.id] = distances[minNode.id] + dist;
        prev[neighbor.id] = minNode.id;
      }
    }
  }

  // Get top N nearest hotels
  const sorted = hotels
    .map((hotel) => ({ ...hotel, distance: distances[hotel.id] }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, topN);

  return sorted;
}

module.exports = findNearestHotels;
