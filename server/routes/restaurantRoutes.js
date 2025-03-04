// routes/restaurantRoutes.js
const express = require('express');
const router = express.Router();
const { getAllRestaurants, createRestaurant } = require('../controllers/RestaurantController');

router.get('/', getAllRestaurants);
router.post('/', createRestaurant);

module.exports = router;
