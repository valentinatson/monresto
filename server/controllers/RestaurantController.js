// controllers/RestaurantController.js
const db = require('../config/db'); // Assurez-vous que votre fichier de connexion MySQL est bien configuré

// Récupérer tous les restaurants
const getAllRestaurants = (req, res) => {
    const query = 'SELECT * FROM restaurants';

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur serveur', error: err });
        }
        res.json(results);
    });
};

// Créer un restaurant
const createRestaurant = (req, res) => {
    const { name, address, seats, hours, image1, image2, image3, image4 } = req.body;

    // Vérifier que tous les champs obligatoires sont fournis
    if (!name || !address || !seats || !hours) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
    }

    const query = `
        INSERT INTO restaurants (name, address, seats, hours, image1, image2, image3, image4) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, address, seats, hours, image1, image2, image3, image4];

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur serveur', error: err });
        }
        res.status(201).json({ message: 'Restaurant créé avec succès', restaurantId: result.insertId });
    });
};

module.exports = { getAllRestaurants, createRestaurant };
