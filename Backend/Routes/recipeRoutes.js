const express = require('express');
const Recipe = require('../Models/Recipe'); 
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

// Submit a new recipe
router.post('/', authMiddleware, async (req, res) => {
  const { title, ingredients, instructions } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      ratings: [], 
      averageRating: 0 
    });
    await newRecipe.save();
    res.status(201).json({ msg: 'Recipe submitted successfully', recipe: newRecipe });
  } catch (error) {
    console.error('Error submitting recipe:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
