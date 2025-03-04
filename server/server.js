// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const upload = require('./middleware/multer');  // Importation du middleware multer
require("dotenv").config();

dotenv.config();
const app = express();

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000', // Autoriser seulement localhost:3000
  }));


// Middleware pour parser le JSON
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
