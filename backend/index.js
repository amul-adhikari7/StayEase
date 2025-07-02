const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDatabase = require("./database/database");
const cron = require("node-cron");
const Room = require("./models/roomModel");
const { runSpatialMining } = require("./service/spatialMining");

dotenv.config();

connectDatabase();
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use("/rooms", express.static(path.join(__dirname, "public/rooms")));
// Enable file upload middleware
app.use(fileUpload());

// routesgit
app.use("/api/users", require("./routes/userRoutes")); // User-related routes
app.use("/api/room", require("./routes/roomRoutes"));
app.use("/api/booking", require("./routes/bookingRoute"));

const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

// Spatial intelligence routes
app.use("/api/spatial", require("./routes/spatialRoutes"));

// Register the new /api/hotels route for spatial hotel search
app.use("/api/hotels", require("./routes/hotelRoutes"));

// Weekly spatial mining job (runs every Sunday at 2am)
cron.schedule("0 2 * * 0", async () => {
  try {
    // Fetch all hotels/rooms with coordinates
    const rooms = await Room.find({
      lat: { $exists: true },
      lon: { $exists: true },
    });
    const hotels = rooms.map((r) => ({
      id: r._id.toString(),
      lat: r.lat,
      lon: r.lon,
    }));
    if (hotels.length > 0) {
      await runSpatialMining(hotels);
      console.log("Spatial mining completed and saved.");
    }
  } catch (err) {
    console.error("Spatial mining failed:", err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
