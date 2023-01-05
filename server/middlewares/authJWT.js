const { sign, verify } = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');

const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const KEY = process.env.JWT_KEY;

const createToken = (id) => {
  return sign({ id }, KEY);
};

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.header('authToken');
  if (!token) return res.status(401).json({ message: "No Token found" });
  try {
    const data = verify(token, KEY);
    if (data) {
      req.user = await Users.findById(data.id);
      return next();
    }
  } catch (err) {
    return res.status(401).json({ er })
  }
});

module.exports = { createToken, validateToken };