const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware"); // Vous pouvez ajouter un middleware d'authentification pour les routes protégées

// Route pour l'inscription d'un utilisateur
router.post("/signup", UserController.signup);

// Route pour la connexion d'un utilisateur
router.post("/login", UserController.login);

// Exemple de route protégée (utilise le middleware d'authentification)
router.get("/profile", authMiddleware, (req, res) => {
  // Vous pouvez ajouter des données supplémentaires dans la réponse si nécessaire
  res.status(200).json({ message: "Accès au profil autorisé", userId: req.user.userId });
});

module.exports = router;
