const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  ratings: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: { type: Number } }],
  averageRating: { type: Number, default: 0 }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;