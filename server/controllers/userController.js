const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { createToken } = require('../middleware/authJWT');


class userController {
  static showUsers = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const users = await Users.find({ _id: { $ne: id } }).select([
        "_id",
        "name",
        "number"
      ]);
      if (users) return res.status(200).json({ users, status: true });
      else {
        return res.status(404).json({ message: "No Users Found", status: false });
      }
    } catch (er) {
      return res.status(501).json({ message: 'Something went wrong', error: er, status: false });
      // console.log(er);
    }
  });

  static registerUsers = asyncHandler(async (req, res) => {
    const { username, name, number, password } = req.body;
    try {
      const user = await Users.findOne({ username });
      if (user) return res.status(401).json({ message: 'User already exists', status: false });
      const pass = await bcrypt.hash(password, 10);
      const User = await Users.create({
        username,
        name,
        number,
        password: pass
      });
      if (User) {
        return res.status(201).json({
          message: "User created successfully",
          status: true,
          user: {
            _id: User._id,
            username: User.username,
            name: User.name,
            number: User.number,
            token: createToken(User._id)
          },
        });
      }
    } catch (er) {
      return res.status(501).json({ error: er.message, status: false });
      console.log(er);
    }
  });

  static authUsers = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await Users.findOne({ username });
      if (!user) return res.status(401).json({ message: 'User not found', status: false });
      const pass = await bcrypt.compare(password, user.password);
      if (user && pass) {
        // const token = createToken(user._id);
        res.status(201).json({
          message: "User logged in successfully",
          status: true,
          user: {
            _id: user._id,
            username: user.username,
            name: user.name,
            number: user.number,
            token: createToken(user._id)
          }
        });
        // .cookie("authToken", token, {
        //   httpOnly: true,
        // })
      }
    } catch (er) {
      return res.status(501).json({ error: er, status: false });
      console.log(er);
    }
  });
}

module.exports = userController;