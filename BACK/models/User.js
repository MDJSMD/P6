//Utilisation de mangoose pour intéragir avec la base de données.
const mongoose = require('mongoose');
//Utilisation d'un plugin à notre shema et permet de ne pas utiliser plusieurs fois la même adresse e-mail.
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, //Création d'un champ email unique.
  password: { type: String, required: true } //Création d'un champ password recquis.
});
//Permet de ne pas utiliser plusieurs fois la même adresse e-mail.
userSchema.plugin(uniqueValidator);
//Exportation de ce schéma comme schéma de données.
module.exports = mongoose.model('User', userSchema);