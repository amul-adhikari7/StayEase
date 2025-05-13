const path = require('path')
const roomModel = require('../models/roomModel')
const fs = require('fs')

const createRoom = async (req, res) => {
  console.log('req.body:', req.body) // Logs form fields
  console.log('req.files:', req.files) // Logs uploaded files

  const { roomName, hotelName, price, location, description, noOfBeds } =
    req.body

  if (
    !roomName ||
    !hotelName ||
    !price ||
    !location ||
    !description ||
    !noOfBeds
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all the fields'
    })
  }

  if (!req.files || !req.files.image) {
    return res.status(400).json({
      success: false,
      message: 'Please upload an image'
    })
  }

  const { image } = req.files
  const imageName = `${Date.now()}-${image.name}`
  const imageUploadPath = path.join(__dirname, `../public/rooms/${imageName}`)

  try {
    await image.mv(imageUploadPath)

    const newRoom = new roomModel({
      roomName,
      hotelName,
      price,
      location,
      description,
      noOfBeds,
      image: imageName
    })

    const room = await newRoom.save()
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      room
    })
  } catch (error) {
    console.error('Error creating room:', error)
    return res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// Fetch all rooms
const getAllRooms = async (req, res) => {
  try {
    const allRooms = await roomModel.find({})
    res.status(200).json({
      success: true,
      message: 'All rooms fetched successfully',
      data: allRooms
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error
    })
  }
}

// Fetch single room
const getSingleRoom = async (req, res) => {
  const roomId = req.params.id

  try {
    const room = await roomModel.findById(roomId)
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Room fetched successfully',
      data: room
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error
    })
  }
}

// Delete a room
const deleteRoom = async (req, res) => {
  try {
    const room = await roomModel.findByIdAndDelete(req.params.id)
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      })
    }

    const imagePath = path.join(__dirname, `../public/rooms/${room.image}`)
    fs.unlinkSync(imagePath)

    res.status(200).json({
      success: true,
      message: 'Room deleted successfully'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error
    })
  }
}

// Update room
const updateRoom = async (req, res) => {
  try {
    if (req.files && req.files.image) {
      const { image } = req.files
      const imageName = `${Date.now()}-${image.name}`
      const imageUploadPath = path.join(
        __dirname,
        `../public/rooms/${imageName}`
      )

      await image.mv(imageUploadPath)
      req.body.image = imageName

      const existingRoom = await roomModel.findById(req.params.id)
      const oldImagePath = path.join(
        __dirname,
        `../public/rooms/${existingRoom.image}`
      )
      fs.unlinkSync(oldImagePath)
    }

    const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )

    res.status(200).json({
      success: true,
      message: 'Room updated successfully',
      room: updatedRoom
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error
    })
  }
}

const searchRoomsByName = async (req, res) => {
  const { name } = req.query

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Hotel name is required for search'
    })
  }

  try {
    const rooms = await roomModel.find({
      hotelName: { $regex: name, $options: 'i' } // Case-insensitive search
    })

    res.status(200).json({
      success: true,
      data: rooms
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching for rooms',
      error: error.message
    })
  }
}

module.exports = {
  createRoom,
  getAllRooms,
  getSingleRoom,
  deleteRoom,
  updateRoom,
  searchRoomsByName
}
