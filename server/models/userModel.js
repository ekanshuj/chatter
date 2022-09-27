const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5,
    max: 17,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 7
  }
}, { timestamps: true });

module.exports = mongoose.model("Users", userModel);