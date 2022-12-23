//création d'un serveur HTTP à l'aide de la bibliothèque 'http' de node.js.
const http = require("http");
//importation du fichier de l'application.
const app = require("./app");

//Fonction qui convertit une valeur de port en entier et renvoie une erreur si la valeur est inférieure à 0.
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
//Fonction qui renvoi un port valide et utilisé par le fichier app.js.
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
//Fonction qui gère les erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
//Fonction qui créer un serveur avec la valeur app comme argument.
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Fonction qui démarre le serveur avec le port comme argument.
server.listen(port);

