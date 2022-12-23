//Utilisation de multer qui permet la gestion de fichiers.
const multer = require('multer');
//Liste des extensions autorisés.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//Configuration du multer.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); //Emplacement de sauvegarde des images.
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype]; //Modification du nom des fichiers par la date actuelle.
    callback(null, name + Date.now() + '.' + extension);
  }
});
//Exportation du multer configuré.
module.exports = multer({storage: storage}).single('image');