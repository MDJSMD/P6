//Importation du module "jsonwebtoken" pour vérifier l'authenticité d'un token d'authentification.
const jwt = require('jsonwebtoken');
//Exportation du module 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; //Vérification de la présence d'un token.
       const decodedToken = jwt.verify(token, process.env.LOGIN_TOKEN); ////Vérification de l'authenticité du token grâce à une clef secrète.
       const userId = decodedToken.userId;
       req.auth = { //Stockage de l'identifiant de l'utilisateur dans l'objet req.auth.
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};