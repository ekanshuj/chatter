// const mongoose = require('mongoose');
// const URL = process.env.MONGO_URL;

// const connectDB = () => {
//   mongoose.set("strictQuery", false);
//   try {
//     mongoose.connect(URL)
//       .then((user) => console.log('MongoDB Connected...'));
//     // mongoose.connect
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');
const URL = process.env.MONGO_URL;
const asyncHandler = require('express-async-handler');

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(URL, {
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;