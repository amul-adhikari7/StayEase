const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  isAdmin: { type: Boolean, default: false },
  phone: { type: String, required: true, match: /^\d{10,15}$/ },
  resetPasswordOTP: { type: Number, min: 100000, max: 999999, default: null },
  resetPasswordExpires: { type: Date, default: null }
})

const User = mongoose.model('User', userSchema)
module.exports = User
