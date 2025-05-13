const router = require('express').Router();
const roomController = require('../controller/roomController');
const { authGuard } = require('../middleware/authGuard');

// Create a room
router.post('/create', roomController.createRoom);

// Fetch all rooms
router.get('/get_all_rooms', roomController.getAllRooms);

// Fetch single room
router.get('/get_single_room/:id', roomController.getSingleRoom);

// Delete a room
router.delete('/delete_room/:id', roomController.deleteRoom);

// Update a room
router.put('/update_room/:id', roomController.updateRoom);

module.exports = router;
