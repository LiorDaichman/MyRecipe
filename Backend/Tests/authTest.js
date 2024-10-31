const axios = require('axios');

// Base URL of your API
const baseURL = 'http://localhost:5000/api/auth';

// Sample data for testing
const testUser = {
  username: 'testuser',
  email: 'testuser@example.com',
  password: 'testpassword'
};

// Function to test registration
const testRegister = async () => {
  try {
    const response = await axios.post(`${baseURL}/register`, testUser);
    console.log('Register response:', response.data);
  } catch (error) {
    console.error('Register error:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

// Function to test login
const testLogin = async () => {
  try {
    const response = await axios.post(`${baseURL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('Login response:', response.data);
    return response.data.token; // Return the token for further use
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

// Function to test profile access
const testProfile = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the request header
      }
    });
    console.log('Profile response:', response.data);
  } catch (error) {
    console.error('Profile access error:', error.response ? error.response.data : error.message);
  }
};

// Function to test profile update
const testProfileUpdate = async (token) => {
  try {
    const response = await axios.put(`${baseURL}/profile`, {
      username: 'updatedUser', // New username
      email: 'updatedUser@example.com' // New email
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Profile update response:', response.data);
  } catch (error) {
    console.error('Profile update error:', error.response ? error.response.data : error.message);
  }
};

// Run the test functions
const runTests = async () => {
  await testRegister();
  const token = await testLogin();

  if (token) {
    console.log('Successfully logged in, token:', token);
    await testProfile(token); // Test profile access
    await testProfileUpdate(token); // Test profile update
  }
};

runTests();
