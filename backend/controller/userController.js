const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const nodemailer = require('nodemailer')
exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body

  try {
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    console.log('Checking for existing user...')
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone
    })

    await newUser.save()

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser })
  } catch (error) {
    console.error('Error during registration:', error)
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message })
  }
}

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body
  console.log(req.body)

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.status(200).json({
      message: 'Login successful',
      token: token,
      userData: user
    })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Get User Profile by user id and  bearer token for users and admin
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phone, email } = req.body
    const user = await User.findById(req.user.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name || user.name
    user.phone = phone || user.phone
    user.email = email || user.email

    await user.save()

    res.status(200).json({ message: 'Profile updated successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

//verify account using opt
exports.verifyAccount = async (req, res) => {
  const { otp } = req.body
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' })
    }

    user.isVerified = true
    user.otp = null

    await user.save()

    res.status(200).json({ message: 'Account verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

// forget password sent mail throung nodemailer
exports.forgotPassword = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString() // Ensure OTP is a string
    user.resetPasswordOTP = otp
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes

    await user.save()

    // Send OTP via nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'amuladhikari07@gmail.com',
        pass: 'qopmdyqknfncvuwa'
      }
    })

    const mailOptions = {
      from: 'Luxestay@gmail.com',
      to: email,
      subject: 'Reset Password OTP',
      text: `Your OTP to reset your password is ${otp}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error)
        return res.status(500).json({
          success: false,
          message: 'Failed to send OTP. Please try again.'
        })
      } else {
        console.log('Email sent:', info.response)
      }
    })

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp // Optional: Remove in production for security
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    })
  }
}

// Reset Passwordaccording to the otp
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body

  try {
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp.toString(), // Compare as string
      resetPasswordExpires: { $gt: Date.now() } // Ensure OTP is not expired
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP or OTP has expired. Please try again.'
      })
    }

    user.password = await bcrypt.hash(newPassword, 12)
    user.resetPasswordOTP = null
    user.resetPasswordExpires = null

    await user.save()

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    })
  }
}

// Delete User Profile
exports.deleteUserProfile = async (req, res) => {
  try {
    // Find the user by ID from the request
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Delete the user
    await user.deleteOne()

    res.status(200).json({ message: 'User profile deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res
      .status(500)
      .json({ message: 'Failed to delete user profile', error: error.message })
  }
}
