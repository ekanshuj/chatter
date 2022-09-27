const mongoose = require('mongoose');
const URI = process.env.MONGO_URI;
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

module.exports = connectDB;