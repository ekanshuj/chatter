const asyncHandler = require('express-async-handler');
const Chats = require('../models/messageModel');

class messageController {

  static getMessages = asyncHandler(async (req, res) => {
    // const { id } = req.params;
    // const messages = await Chats.find({ users: id });
    res.status(200).json("Hello");
  })

  static createMessages = asyncHandler(async (req, res) => {
    const { from, to, message } = req.body;
    try {
      const data = await Chats.create({
        message: {
          chat: message
        },
        users: [from, to],
        source: from,
      });
      if (data) return res.status(201).json({ message: "Chats integrated successfully", data })
      else { return res.status(401).json({ message: "Error Sending Chats ! Please try again later." }) };
    } catch (er) {
      console.log(er);
      return res.status(501).json({ message: 'Something went Wrong', error: er, status: false });
    }
  })
}


module.exports = messageController;