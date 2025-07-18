// Simple DBSCAN implementation for hotel clustering
const haversineDistance = require("./haversine");

/**
 * DBSCAN clustering for hotel locations
 * @param {Array<{id: string, lat: number, lon: number}>} hotels
 * @param {number} eps - Neighborhood radius in km
 * @param {number} minPts - Minimum points to form a cluster
 * @returns {Array<{center: {lat: number, lon: number}, members: Array, isOutlier: boolean}>}
 */
function dbscan(hotels, eps = 1, minPts = 3) {
  const labels = Array(hotels.length).fill(undefined);
  let clusterId = 0;

  function regionQuery(idx) {
    const neighbors = [];
    for (let i = 0; i < hotels.length; i++) {
      if (haversineDistance(hotels[idx], hotels[i]) <= eps) neighbors.push(i);
    }
    return neighbors;
  }

  function expandCluster(idx, neighbors, clusterId) {
    labels[idx] = clusterId;
    for (let i = 0; i < neighbors.length; i++) {
      const nIdx = neighbors[i];
      if (labels[nIdx] === undefined) {
        labels[nIdx] = clusterId;
        const nNeighbors = regionQuery(nIdx);
        if (nNeighbors.length >= minPts) {
          neighbors = neighbors.concat(
            nNeighbors.filter((x) => !neighbors.includes(x))
          );
        }
      }
    }
  }

  for (let i = 0; i < hotels.length; i++) {
    if (labels[i] !== undefined) continue;
    const neighbors = regionQuery(i);
    if (neighbors.length < minPts) {
      labels[i] = -1; // noise
    } else {
      expandCluster(i, neighbors, clusterId);
      clusterId++;
    }
  }

  // Group clusters
  const clusters = [];
  for (let c = 0; c < clusterId; c++) {
    const members = hotels.filter((_, i) => labels[i] === c);
    const center = {
      lat: members.reduce((sum, h) => sum + h.lat, 0) / members.length,
      lon: members.reduce((sum, h) => sum + h.lon, 0) / members.length,
    };
    clusters.push({ center, members, isOutlier: false });
  }
  // Outliers
  const outliers = hotels.filter((_, i) => labels[i] === -1);
  if (outliers.length)
    clusters.push({ center: null, members: outliers, isOutlier: true });

  return clusters;
}

module.exports = dbscan;
