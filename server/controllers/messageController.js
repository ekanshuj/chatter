const asyncHandler = require('express-async-handler');
const Chats = require('../models/messageModel');

class messageController {

  static getMessages = asyncHandler(async (req, res) => {
    const { from, to } = req.body;
    try {
      const messageArr = await Chats.find({
        $and: [
          { users: { $in: [from] } },
          { users: { $in: [to] } }
        ]
      }).sort({ createdAt: 1 });

      const messages = messageArr.map((mess) => {
        return {
          sender: mess.source.toString() === from,
          message: mess.message.chat
        }
      });
      if (!messages) return res.status(401).json({ status: false, message: "Something went Wrong" });
      return res.status(200).json({ status: true, messages });
    } catch (er) {
      console.log(er);
      return res.status(501).json({ message: 'Something went Wrong', error: er, status: false });
    }
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
      if (data) return res.status(201).json({ message: "Chats integrated successfully", data, status: true });
      else { return res.status(401).json({ message: "Error Sending Chats ! Please try again later.", status: false }) };
    } catch (er) {
      console.log(er);
      return res.status(501).json({ message: 'Something went Wrong', error: er, status: false });
    }
  })
}


module.exports = messageController;