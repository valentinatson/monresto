const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token manquant ou invalide" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Ajouter les informations de l'utilisateur au request
    next(); // Passer à la route suivante
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};

module.exports = authMiddleware;
