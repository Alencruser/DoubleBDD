var express = require('express');
var app = express();
var mysql = require('mysql');

var server = app.listen(3000, (req,res) => 
console.log('Server Ready')
);

