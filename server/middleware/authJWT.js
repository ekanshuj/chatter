const { sign, verify } = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const KEY = 'jaishriram';

const createToken = (id) => {
  return sign({ id }, KEY)
};

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.header("authToken");
  if (!token) return res.status(401).json({ message: 'No Token Found' });
  try {
    const data = verify(token, KEY);
    if (data) {
      req.user = await Users.findById(data.id);
      return next();
    }
  } catch (er) {
    return res.status(401).json({ error: er });
  }
});


module.exports = { createToken, validateToken };

