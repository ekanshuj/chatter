const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;
const asyncHandler = require('express-async-handler');

const connectDB = asyncHandler(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
});

module.exports = connectDB;