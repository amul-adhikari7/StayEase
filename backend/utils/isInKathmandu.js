/**
 * Checks if a coordinate is inside the Kathmandu bounding box.
 * @param {number} lat
 * @param {number} lon
 * @returns {boolean}
 */
function isInKathmandu(lat, lon) {
  const north = 27.7721,
    south = 27.636,
    east = 85.4505,
    west = 85.27;
  return lat >= south && lat <= north && lon >= west && lon <= east;
}

module.exports = isInKathmandu;
