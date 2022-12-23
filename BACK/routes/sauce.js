//Utilisation de express.
const express = require('express');
//Création du router.
const router = express.Router();
//Importation du middleware authentification.
const auth = require('../middleware/auth');
//Importation du middleware multer.
const multer = require('../middleware/multer-config');
//Importation du controller sauces.
const sauceCtrl = require('../controllers/sauce');

//Définition des routes.
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post("/:id/like", auth, sauceCtrl.userNotation);

//Exportation du module pour être utilisé dans d'autres parties de l'application.
module.exports = router;