const express = require("express");
const mongoose = require('mongoose');
require("dotenv").config();
const helmet = require("helmet");


const sauceRoutes = require("./routes/sauce");
const userRoutes = require('./routes/user');
const path = require("path");


const app = express();
app.use(helmet());

app.use(express.json());

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


  
mongoose.set('strictQuery', true);
mongoose.connect(process.env.LOGIN_DB,
    { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
    })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));



app.use("/api/sauces", sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;