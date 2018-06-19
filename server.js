const express = require('express');
const app = express();
const mysql = require('mysql');

// Création de la connexion de mysql avec le site
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'DoubleBDD'
});

// Définition du moteur de template
app.set('view engine', 'slm');

// Définition des routes
app.get("/", function (req, res) {
    res.render("index");
});
app.get("/addpost", function (req, res) {
    res.render("addpost");
});

// Ouverture de la connexion mysql
connection.connect(function(err){
    if (err){
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');    
});

// Fermeture de la connexion mysql
connection.end(function(err){
    if (err){
        return console.log('error: ' + err.message);        
    }
    console.log('Close the database connection.');    
});

// Lancement du serveur
const server = app.listen(3000, (req,res) => 
console.log('Server Ready')
);

