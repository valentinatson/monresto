// controllers/RestaurantController.js
const Restaurant = require('../models/Restaurant');

const getAllRestaurants = (req, res) => {
    Restaurant.getAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        res.json(results);
    });
};

const createRestaurant = (req, res) => {
    const { name, address, seats, hours } = req.body;
    Restaurant.create({ name, address, seats, hours }, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        res.status(201).json({ message: 'Restaurant créé avec succès' });
    });
};

module.exports = { getAllRestaurants, createRestaurant };
