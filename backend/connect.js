const mongoose = require('mongoose');

const connectMongoDB = (url) => {
  return mongoose.connect(url)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      throw err; // Re-throw to let the caller handle it
    });
};

module.exports = { connectMongoDB };