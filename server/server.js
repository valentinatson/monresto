// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const upload = require('./middleware/multer');  // Importation du middleware multer
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Initialisation d'Express
const app = express();

// Charger le fichier .env
dotenv.config();

// Charger le fichier swagger.yaml
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Utiliser Swagger UI pour afficher la documentation de l'API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS pour autoriser localhost:3000
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Autoriser seulement localhost:3000
}));

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Routes de l'API
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
