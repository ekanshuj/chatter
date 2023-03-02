const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createToken } = require('../middlewares/authJWT');

class userController {
  static showUsers = asyncHandler(async (req, res) => {
    const { id } = req.body;
    try {
      const users = await Users.find({ _id: { $ne: id } }).select([
        "_id",
        "name",
        "username"
      ]);
      if (users) return res.status(200).json({ status: true, users });
      else {
        return res.status(404).json({ status: false, message: "No Users Found" });
      }
    } catch (err) {
      console.log(err);
      return res.status(501).json({ status: false, error: err.message });
    }
  });

  static registerUsers = asyncHandler(async (req, res) => {
    const { username, name, password } = req.body;
    try {
      const user = await Users.findOne({ username });
      if (user) return res.status(401).json({ status: false, message: "User already exists" });
      const pass = await bcrypt.hash(password, 10);
      const User = await Users.create({
        username, name, password: pass
      });
      if (User) return res.status(200).json({
        status: true, message: "User created successfully", user: {
          _id: User._id,
          username: User.username,
          name: User.name,
          token: createToken(User._id)
        }
      })
    } catch (err) {
      console.log(err);
      return res.status(501).json({ status: false, error: err.message });
    }
  });

  static authUsers = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await Users.findOne({ username });
      if (!user) return res.status(404).json({ status: false, message: "User not found" });
      const pass = await bcrypt.compare(password, user.password);
      if (user && pass) {
        return res.status(200).json({
          status: true, message: "User authenticated successfully", user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            token: createToken(user._id)
          }
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(501).json({ status: false, error: err.message });
    }
  });
};

module.exports = userController;