const asyncHandler = require('express-async-handler');
const Chats = require('../models/messageModel');

class messageController {

  static getMessages = asyncHandler(async (req, res) => {
    res.send("hello getM");
  })

  static createMessages = asyncHandler(async (req, res) => {
    res.send("hello createM");
  })
}


module.exports = messageController;