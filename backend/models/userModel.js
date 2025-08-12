const mongoose = require("mongoose");

class UserModel {
  constructor() {
    this.schema = new mongoose.Schema({
      name: { type: String, required: true },
      email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
      },
      password: { type: String, required: true, minlength: 6 },
      isAdmin: { type: Boolean, default: false },
      phone: { type: String, required: true, match: /^\d{10,15}$/ },
      resetPasswordOTP: {
        type: Number,
        min: 100000,
        max: 999999,
        default: null,
      },
      resetPasswordExpires: { type: Date, default: null },
    });

    // Add instance methods
    this.schema.methods.generateOTP = function () {
      this.resetPasswordOTP = Math.floor(100000 + Math.random() * 900000);
      this.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      return this.save();
    };

    this.schema.methods.verifyOTP = function (otp) {
      return (
        this.resetPasswordOTP === otp && this.resetPasswordExpires > new Date()
      );
    };

    // Add static methods
    this.schema.statics.findByEmail = function (email) {
      return this.findOne({ email });
    };

    this.schema.statics.findAdmins = function () {
      return this.find({ isAdmin: true });
    };

    // Create and return model
    return mongoose.model("User", this.schema);
  }

  // Static factory method
  static async createUser(userData) {
    const User = mongoose.model("User");
    const user = new User(userData);
    return await user.save();
  }

  // Static utility methods
  static async updateProfile(userId, updateData) {
    const User = mongoose.model("User");
    return User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  static async resetPassword(userId, newPassword) {
    const User = mongoose.model("User");
    return User.findByIdAndUpdate(
      userId,
      {
        password: newPassword,
        resetPasswordOTP: null,
        resetPasswordExpires: null,
      },
      { new: true }
    );
  }
}

const User = new UserModel();
module.exports = User;
