const express = require('express');
const app = express();
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'DoubleBDD'
});
app.set('view engine', 'slm');

app.get("/", function (req, res) {
    res.render("index");
});
connection.connect(function(err){
    if (err){
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');    
});

connection.end(function(err){
    if (err){
        return console.log('error: ' + err.message);        
    }
    console.log('Close the database connection.');    
});

const server = app.listen(3000, (req,res) => 
console.log('Server Ready')
);
