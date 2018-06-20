const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require ('body-parser');
app.use(express.static('public'));

// Création de la connexion de mysql avec le site
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'DoubleBDD'
});
//Utilisation de body-parser par le serveur
app.use(bodyparser.urlencoded({extended: false}));
// Définition du moteur de template
app.set('view engine', 'slm');

// Définition des routes
app.get("/", function (req, res) {
    //recup de la liste des posts
    let sqlListPost = "SELECT titre,corps,date_Post FROM Post";
    connection.query(sqlListPost, function select(error, results, fields) {
        if (error) {
            console.log(error);
            //connection.end();
            return;
        }
        if (results.length > 0) {
            console.log(results);
            
            res.render("index",{listPost: results});
        } else {
            console.log("Pas de données");
            res.render('index');
        }
        //connection.end();
    });
});
app.get("/addpost", function (req, res) {
    res.render("addpost");
});

app.post("/addpost",function(req,res){
    console.log(req.body.titre);
    console.log(req.body.corps);
    let sqlCreatePost = 'INSERT INTO Post (titre,corps,date_Post,id_User) VALUES("'+req.body.titre+'","'+req.body.corps+'",NOW(),1)';
    connection.query(sqlCreatePost,function(error,results,fields){
        if(error){
            console.log(error);
            return;
        }
        res.redirect("/");
    })
})

// Ouverture de la connexion mysql
/*connection.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

// Fermeture de la connexion mysql
connection.end(function (err) {
    if (err) {
        return console.log('error: ' + err.message);
    }
    console.log('Close the database connection.');
});*/

// Lancement du serveur
const server = app.listen(3000, (req, res) =>
    console.log('Server Ready')
);
