//Utilisation du package de cryptage bcrypt.
const bcrypt = require('bcrypt');
//Utilisation du package qui créé des token et les vérifie.
const jwt = require('jsonwebtoken');

//Utilisation du model user.
const User = require('../models/User');
//Exportation de la fonction qui permet la création d'un nouvel utilisateur.
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //Utilisation de bcrypt pour crypter le mot de passe de l'utilisateur.
      .then(hash => {
        const user = new User({ //Création d'un nouvel utilisateur.
          email: req.body.email,
          password: hash
        });
        user.save() //Sauvegarde de l'utilisateur.
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
//Exportation de la fonction qui permet la connection d'un nouvel utilisateur.
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //Recherche de l'adresse mail dans la base de données.
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            //Utilsation de la méthode compare pour vérifier que le mot de passe est conforme a celui présent dans la base de données.            
            bcrypt.compare(req.body.password, user.password) 
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign( //Création d'un token d'authentification.
                            { userId: user._id },
                            process.env.LOGIN_TOKEN,
                            { expiresIn: '24h' }
                            )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };