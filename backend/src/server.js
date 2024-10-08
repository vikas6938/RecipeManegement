const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');  // Adjust path if necessary
const recipeRoutes = require('./routes/recipe');  // Adjust path if necessary
const dbConnection = require('./config/db');
const Config = require('./config');
require('dotenv').config();

// Initialize app
const app = express();

// Middleware to parse incoming JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());  // Enable CORS

// Database connection
dbConnection();



// API Routes
app.use('/api/users', authRoutes);  // User-related routes
app.use('/api/recipes', recipeRoutes);  // Recipe-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





