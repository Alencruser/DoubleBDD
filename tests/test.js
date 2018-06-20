var expect= require('chai').expect;
var mysql=require('mysql');
var addpost=require('../addpost');

describe('',function(){
	it('should receive an input',function(){

		let connection = mysql.createConnection({
    		host: 'localhost',
    		user: 'root',
    		password: 'toor',
    		database: 'DoubleBDD'
		});
		var success = "authenticated";
		var testing = addpost(connection.state);
		expect(success).to.be.equal(testing);
	})
})