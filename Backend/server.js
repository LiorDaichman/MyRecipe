const express = require('express');
const connectDB = require('./db'); // Import the MongoDB connection file
const authRoutes = require('./Routes/authRoutes');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware for JSON parsing
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));