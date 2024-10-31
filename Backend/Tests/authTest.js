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

// Run the test functions
const runTests = async () => {
  await testRegister();
  const token = await testLogin();

  if (token) {
    console.log('Successfully logged in, token:', token);
  }
};

runTests();
