const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
const userCredentials = {
  email: 'testuser@example.com',
  password: 'testpassword', 
};

const getToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userCredentials);
    return response.data.token;
  } catch (error) {
    console.error('Login error:', error.response.data);
  }
};

const submitRecipe = async (token) => {
  const recipeData = {
    title: 'Test Recipe',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: 'Test instructions',
  };

  try {
    const response = await axios.post(`${BASE_URL}/recipes`, recipeData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Submit recipe response:', response.data);
    console.log('Recipe submission successful!');
  } catch (error) {
    console.error('Submit recipe error:', error.response.data);
  }
};

const runTest = async () => {
  const token = await getToken(); // Get token
  if (token) {
    await submitRecipe(token); // Submit recipe with the token
  }
};

runTest();
