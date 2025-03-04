const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db"); // Connexion MySQL
require("dotenv").config();


// Fonction pour l'inscription
exports.signup = (req, res) => {
  const { username, telephone, email, password, role } = req.body;

  if (!username || !telephone || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  // Vérifier si l'email existe déjà
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, existingUser) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "L'email est déjà utilisé." });
    }

    // Hacher le mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Erreur de hachage :", err);
        return res.status(500).json({ message: "Erreur interne du serveur." });
      }

      // Insérer l'utilisateur
      db.query(
        "INSERT INTO users (name, phone, email, password, role) VALUES (?, ?, ?, ?, ?)",
        [username, telephone, email, hashedPassword, role],
        (err, result) => {
          if (err) {
            console.error("Erreur SQL lors de l'insertion :", err);
            return res.status(500).json({ message: "Erreur interne du serveur." });
          }

          res.status(201).json({
            message: "Utilisateur créé avec succès",
            user: { id: result.insertId, username, email, role },
          });
        }
      );
    });
  });
};

// Fonction pour la connexion
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email et mot de passe sont requis." });
  }

  // Vérifier si l'utilisateur existe
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, users) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ message: "Erreur interne du serveur." });
    }

    if (users.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const user = users[0];

    // Comparer le mot de passe
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Erreur de comparaison :", err);
        return res.status(500).json({ message: "Erreur interne du serveur." });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Mot de passe incorrect." });
      }

      // Générer un token JWT
      const token = jwt.sign(
        { userId: user.id, name: user.name, role: user.role },
        process.env.JWT_SECRET_KEY || "fallbackSecretKey",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Connexion réussie",
        token,
      });
    });
  });
};
