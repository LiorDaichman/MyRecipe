const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://liordaichman:Tc2ifeLfrSMmV25a@myrecipe.vehr4.mongodb.net/?retryWrites=true&w=majority&appName=MyRecipe');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
