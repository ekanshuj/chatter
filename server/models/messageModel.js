const mongoose = require('mongoose');

const messageModel = new mongoose.Schema({
  message: {
    chat: {
      type: String,
      required: true,
    }
  },
  users: Array,
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Chats", messageModel);