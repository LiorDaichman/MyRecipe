const express = require('express');
const connectDB = require('./db'); 
const authRoutes = require('./Routes/authRoutes');
const recipeRoutes = require('./Routes/recipeRoutes');
const ratingRoutes = require('./Routes/ratingRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware for JSON parsing
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipes', ratingRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));