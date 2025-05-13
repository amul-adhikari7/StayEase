const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");
const connectDatabase = require('./database/database');

dotenv.config();


connectDatabase();
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,

}
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const fileUpload = require("express-fileupload");
app.use("/rooms", express.static(path.join(__dirname, "public/rooms")));
// Enable file upload middleware
app.use(fileUpload());


// routesgit
app.use('/api/users', require('./routes/userRoutes')); // User-related routes
app.use('/api/room', require('./routes/roomRoutes'));
app.use("/api/booking", require("./routes/bookingRoute"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
