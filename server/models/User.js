// models/User.js
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static create(user, callback) {
        const { name, email, password } = user;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        connection.query(query, [name, email, hashedPassword], callback);
    }

    static findByEmail(email, callback) {
        const query = `SELECT * FROM users WHERE email = ?`;
        connection.query(query, [email], callback);
    }

    static findById(id, callback) {
        const query = `SELECT * FROM users WHERE id = ?`;
        connection.query(query, [id], callback);
    }
}

module.exports = User;
