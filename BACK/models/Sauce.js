//Utilisation de mangoose pour intéragir avec la base de données.
const mongoose = require('mongoose');
//Schéma de données utilisé par le front.
const sauceSchema = mongoose.Schema({
    //Champ relative à la sauce.
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    //Champ relative à la notation.
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false }
});
//Exportation du module.
module.exports = mongoose.model('Sauce', sauceSchema);