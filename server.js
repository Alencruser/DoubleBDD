const express = require('express');
const app = express();
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'toor',
    database: 'DoubleBDD'
});

connection.connect(function(err){
    if (err){
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');    
});

const server = app.listen(3000, (req,res) => 
console.log('Server Ready')
);

