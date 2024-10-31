const express = require('express');
const Recipe = require('../Models/Recipe');
const authMiddleware = require('../Middlewares/authMiddleware');

const router = express.Router();

// Rate a recipe
router.post('/:id/rate', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const existingRating = recipe.ratings.find(r => r.userId.toString() === req.user.userId.toString());
    
    if (existingRating) {
      existingRating.rating = rating; // Update existing rating
    } else {
      recipe.ratings.push({ userId: req.user.userId, rating }); // Add new rating
    }

    const totalRatings = recipe.ratings.length;
    const sumRatings = recipe.ratings.reduce((acc, r) => acc + r.rating, 0);
    recipe.averageRating = sumRatings / totalRatings;

    await recipe.save();
    res.json({ msg: 'Rating submitted successfully', averageRating: recipe.averageRating });
  } catch (error) {
    console.error('Error rating recipe:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get average rating of a recipe
router.get('/:id/rating', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findById(id).select('averageRating');
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json({ averageRating: recipe.averageRating });
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Export the router
module.exports = router;
