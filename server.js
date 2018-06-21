const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(express.static('public'));

// Création de la connexion de mysql avec le site
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'DoubleBDD'
});

//Utilisation de body-parser par le serveur
app.use(bodyparser.urlencoded({
    extended: false
}));

// Définition du moteur de template
app.set('view engine', 'slm');

// Définition de la route racine
app.get("/", function (req, res) {
    //recup de la liste des posts
    let sqlListPost = "SELECT titre,corps,DATE_FORMAT(date_Post,'%d/%m/%Y') AS date_formated,id_Post FROM Post ORDER BY id_Post DESC LIMIT 10";
    connection.query(sqlListPost, function select(error, results, fields) {
        if (error) {
            console.log(error);
            //connection.end();
            return;
        }
        if (results.length > 0) {
            //console.log(results);
            res.render("index", {
                listPost: results
            });
        } else {
            console.log("Pas de données");
            res.render('index');
        }
        //connection.end();
    });
});

// Suppression des posts
app.post("/", function (req, res) {
    console.log('del: ' + req.body.del);
    console.log('addcomment: ' + req.body.addcomment);
    if (req.body.del) {
        let sqlDeletePost = 'DELETE FROM Post WHERE id_Post=' + req.body.del + ';';
        connection.query(sqlDeletePost, function (error) {
            if (error) {
                console.log(error);
                return;
            }
            res.redirect("/");
        });
    }
});

// Définition de la route 'ajout post'
app.get("/addpost", function (req, res) {
    res.render("addpost");
});

// Ajout d un post
app.post("/addpost", function (req, res) {
    /*console.log(req.body.titre);
    console.log(req.body.corps);*/
    let sqlCreatePost = 'INSERT INTO Post (titre,corps,date_Post,id_User) VALUES("' + req.body.titre + '","' + req.body.corps + '",NOW(),1)';
    connection.query(sqlCreatePost, function (error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect("/");
    });
});

app.get("/addcomment/:id", function (req, res) {
    console.log (req.params.id)
    res.render("addcomment",{id:req.params.id});
});

app.post("/addcomment/:id", function (req, res) {
    let sqlAddComm = 'INSERT INTO Commentaire (corps_Commentaire, date_Commentaire, id_Post, id_User) VALUES ("'+req.body.corps+'",NOW(),'+req.params.id+',1);'
    connection.query(sqlAddComm, function (error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect("/read/"+req.params.id);
    });
});

//Si on clique sur un post, on l'affiche dans la nouvelle page "read"
app.get('/read/:id', function (req, res) {
    let sqlAffPost = "SELECT titre,corps,DATE_FORMAT(date_Post,'%d/%m/%Y') AS date_formated,id_Post FROM Post WHERE id_Post = " + req.params.id;
    let sqlAffComm = "SELECT corps_Commentaire,DATE_FORMAT(date_Commentaire,'%d/%m/%Y') AS datec_formated, id_Commentaire FROM Commentaire WHERE id_Post = " + req.params.id;
    connection.query(sqlAffPost, function select(error, resultp, fields) {
        if (error) {
            console.log(error);
            return;
        }
        if (resultp.length > 0) {
            connection.query(sqlAffComm, function select(error, resultc, fields) {
                if (error) {
                    console.log(error);
                    return;
                }
                if (resultc.length > 0) {
                    res.render("read", {
                        post: resultp,
                        comments: resultc
                    });
                    return (resultc);
                } else {
                    res.render("read", {
                        post: resultp
                    });
                }
            });
        } else {
            console.log("Pas de données");
            res.render('index');
        }
    });
});

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
