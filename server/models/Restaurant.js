// models/Restaurant.js
const connection = require('../config/db');

class Restaurant {
    static getAll(callback) {
        const query = `SELECT * FROM restaurants`;
        connection.query(query, callback);
    }

    static create(restaurant, callback) {
        const { name, address, seats, hours } = restaurant;
        const query = `INSERT INTO restaurants (name, address, seats, hours) VALUES (?, ?, ?, ?)`;
        connection.query(query, [name, address, seats, hours], callback);
    }

    static findById(id, callback) {
        const query = `SELECT * FROM restaurants WHERE id = ?`;
        connection.query(query, [id], callback);
    }

    static update(id, restaurant, callback) {
        const { name, address, seats, hours } = restaurant;
        const query = `UPDATE restaurants SET name = ?, address = ?, seats = ?, hours = ? WHERE id = ?`;
        connection.query(query, [name, address, seats, hours, id], callback);
    }


    static delete(id, callback) {
        const query = `DELETE FROM restaurants WHERE id = ?`;
        connection.query(query, [id], callback);
    }
}

module.exports = Restaurant;
