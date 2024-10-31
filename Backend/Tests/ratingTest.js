const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const userCredentials = {
  email: 'testuser@example.com',
  password: 'testpassword', 
};

const getToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userCredentials);
    return response.data.token; // Return the token
  } catch (error) {
    console.error('Login error:', error.response.data);
  }
};

const rateRecipe = async (token) => {
  const recipeId = '672360b0d390f74e11b7a77d'; // Use the ID of the submitted recipe
  const ratingData = {
    rating: 4 
  };

  try {
    const response = await axios.post(`http://localhost:5000/api/recipes/${recipeId}/rate`, ratingData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Rate recipe response:', response.data);
  } catch (error) {
    console.error('Rate recipe error:', error.response.data);
  }
};

const fetchAverageRating = async (recipeId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}/rating`);
    console.log('Average rating response:', response.data);
  } catch (error) {
    console.error('Fetch average rating error:', error.response.data);
  }
};

const runTests = async () => {
  const token = await getToken(); // Get the token first
  if (token) {
    await rateRecipe(token); // Rate the recipe with the token
    await fetchAverageRating('672360b0d390f74e11b7a77d'); // Fetch average rating
  }
};

runTests();
