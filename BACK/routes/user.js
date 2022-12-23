//Utilisation de express.
const express = require('express');
//Création du router.
const router = express.Router();
//Utilisation du controller d'authentification.
const userCtrl = require('../controllers/user');

//Création de deux routes pour s'inscrire et se conneecter.
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//Exportation du module pour être utilisé dans d'autres parties de l'application.
module.exports = router;