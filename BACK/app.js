//Importation de la bibliothèque Express qui facilite la création de routes et de gestion des requêtes HTTP.
const express = require("express");
//Importation de la bibliothèque Mongoose qui permet de travailler avec MongoDB.
const mongoose = require('mongoose');
//Importation de dotenv (variables d'environnement).
require("dotenv").config();
//Importation de helmet qui ajoute des en-têtes de sécurité à la réponse HTTP.
const helmet = require("helmet");

//Importation des deux fichiers de routes qui définissent les routes de l'application pour les sauces et les utilisateurs.
const sauceRoutes = require("./routes/sauce");
const userRoutes = require('./routes/user');

//Importation de path qui permet de travailler avec les chemins de fichiers.
const path = require("path");

//Création de l'application expresse.
const app = express();
//Utilisation du module helmet qui ajoute des en-têtes de sécurité à la réponse HTTP
app.use(helmet());
//Utilisation du middleware express.json pour traiter les données de la requête en tant que JSON.
app.use(express.json());

//Accès à l'API depuis des headers définis.
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ); 
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE"
    ); 
    next();
  });


//Connexion à une base de données MongoDB en utilisant Mongoose et la chaîne de connexion stockée dans la variable d'environnement LOGIN_DB. 
mongoose.set('strictQuery', true);
mongoose.connect(process.env.LOGIN_DB,
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));


//Définition du chemin des routes utilisés pour les sauces et les utilisateurs, ainsi que pour stocker les images.
app.use("/api/sauces", sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//Exportation de l'objet app afin qu'il puisse être utilisé par d'autres parties de l'application.
module.exports = app;