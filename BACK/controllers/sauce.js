//Importation du modèle de sauce
const Sauce = require('../models/Sauce');
const fs = require('fs');


//Exportation de la fonction qui permet la création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); //Fonction qui parse l'objet reçu en une chaine de caractères.
    delete sauceObject._id; //suppression de l'id de l'objet.
    const sauce = new Sauce({ //Création d'un nouvel objet Sauce en utilisant les données de l'objet JSON et en ajoutant des propriétés supplémentaires.
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save() //Enregistrement de l'objet dans la base de données en utilisant la méthode save de Mongoose.
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
        .catch(error => res.status(400).json({ error }));
};
//Exportation de la fonction qui modifie une sauce existante dans la base de données en utilisant les données fournies dans la requête.
exports.modifySauce = (req, res, next) => { //Lecture des données de l'objet.
    const sauceObject = req.file ? //Detection d'une url de l'image.
        {
            ...JSON.parse(req.body.sauce), //L'onjet est convertit en chaines de caractères.
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // //Mise à jour de la sauce dans la base de données avec la méthode updateOne de Mongoose.
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

//Exportation de la fonction qui supprime une sauce de la base de données.
exports.deleteSauce = (req, res, next) => {
    console.log("params.id =>\r\n", req.params.id);
    Sauce.findOne({ _id: req.params.id }) //Utilisation de la méthode findOne de Mongoose pour trouver la sauce à supprimer.
      .then((sauce) => {
        const adressImage = sauce.imageUrl.replace(
          `${req.protocol}://${req.get("host")}`,
          ""
        );
        fs.unlink(__dirname + "/.." + adressImage, () => {}); //Suppression de l'image associée à la sauce dans le serveur.
        Sauce.deleteOne({ _id: req.params.id }) ////Suppression de l'image associée à la sauce dans la base de données.
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      }) 
      .catch((error) => res.status(404).json({ error }));
  };
//Exportation de la fonction qui affiche une sauce de la base de données.
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) //Affiche une sauce en utilisant l'identifiant de la sauce. 
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
//Exportation de la fonction qui affiche toutes les sauces de la base de données.
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};
//Exportation de la fonction qui permet de mettre à jour les notes d'une sauce en fonction des actions de l'utilisateur.
exports.userNotation = (req, res, next) => {
    if (req.body.like === 1) { //Si l'utilisateur aime une sauce 
        Sauce.updateOne( //Dans ce cas le compteur de like reçoit un +1.
            { _id: req.params.id },
            {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: +1 }
            })
            .then(() => res.status(200).json({ message: 'Like envoyé !' }))
            .catch(error => res.status(400).json({ error }));
    }
    if (req.body.like === -1) { //Si l'utilisateur n'aime pas la sauce
        Sauce.updateOne( //Dans ce cas le compteur de dislike reçoit un +1.
            { _id: req.params.id },
            {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: +1 }
            })
            .then(() => res.status(200).json({ message: 'Dislike envoyé !' }))
            .catch(error => res.status(400).json({ error }));
    }
    if (req.body.like === 0) {  //Si l'utilisateur annule sa note.
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne( //Dans le cas ou l'utilisateur a déjà laiisé une note
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId }, //Le tableau des like reçoit un -1
                            $inc: { likes: -1 }
                        })
                        .then(() => res.status(200).json({ message: 'Like annulé !' }))
                        .catch(error => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId }, //Le tableau des dislike reçoit un -1
                            $inc: { dislikes: -1 }
                        })
                        .then(() => res.status(200).json({ message: 'Dislike annulé !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch((error) => res.status(404).json({ error }))
    }
};
