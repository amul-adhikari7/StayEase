// QuadTree for spatial partitioning of hotel locations in Kathmandu
class QuadTree {
  constructor(boundary, capacity = 4) {
    this.boundary = boundary; // { minLat, minLon, maxLat, maxLon }
    this.capacity = capacity;
    this.hotels = [];
    this.divided = false;
  }

  insert(hotel) {
    if (!this._inBoundary(hotel)) return false;
    if (this.hotels.length < this.capacity) {
      this.hotels.push(hotel);
      return true;
    }
    if (!this.divided) this._subdivide();
    return (
      this.northeast.insert(hotel) ||
      this.northwest.insert(hotel) ||
      this.southeast.insert(hotel) ||
      this.southwest.insert(hotel)
    );
  }

  _inBoundary(hotel) {
    const { lat, lon } = hotel;
    const { minLat, minLon, maxLat, maxLon } = this.boundary;
    return lat >= minLat && lat <= maxLat && lon >= minLon && lon <= maxLon;
  }

  _subdivide() {
    const { minLat, minLon, maxLat, maxLon } = this.boundary;
    const midLat = (minLat + maxLat) / 2;
    const midLon = (minLon + maxLon) / 2;
    this.northeast = new QuadTree(
      { minLat: midLat, minLon: midLon, maxLat, maxLon },
      this.capacity
    );
    this.northwest = new QuadTree(
      { minLat: midLat, minLon, maxLat, maxLon: midLon },
      this.capacity
    );
    this.southeast = new QuadTree(
      { minLat, minLon: midLon, maxLat: midLat, maxLon },
      this.capacity
    );
    this.southwest = new QuadTree(
      { minLat, minLon, maxLat: midLat, maxLon: midLon },
      this.capacity
    );
    this.divided = true;
    // Move hotels to children
    for (const hotel of this.hotels) {
      this.northeast.insert(hotel) ||
        this.northwest.insert(hotel) ||
        this.southeast.insert(hotel) ||
        this.southwest.insert(hotel);
    }
    this.hotels = [];
  }

  // 2D bounding box + radius filter
  searchNearby(lat, lon, radius, found = []) {
    if (!this._intersectsCircle(lat, lon, radius)) return found;
    for (const hotel of this.hotels) {
      const d = this._haversine(lat, lon, hotel.lat, hotel.lon);
      if (d <= radius) found.push({ ...hotel, distance: d });
    }
    if (this.divided) {
      this.northeast.searchNearby(lat, lon, radius, found);
      this.northwest.searchNearby(lat, lon, radius, found);
      this.southeast.searchNearby(lat, lon, radius, found);
      this.southwest.searchNearby(lat, lon, radius, found);
    }
    return found;
  }

  _intersectsCircle(lat, lon, radius) {
    // Find closest point in boundary to circle center
    const { minLat, minLon, maxLat, maxLon } = this.boundary;
    const clampedLat = Math.max(minLat, Math.min(lat, maxLat));
    const clampedLon = Math.max(minLon, Math.min(lon, maxLon));
    const d = this._haversine(lat, lon, clampedLat, clampedLon);
    return d <= radius;
  }

  _haversine(lat1, lon1, lat2, lon2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}

module.exports = QuadTree;
