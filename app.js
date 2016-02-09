var express = require('express');
var request = require('request');
var app = express();

var txUrl = "http://localhost:7474/db/data/transaction/commit";

app.get('/', function (req, res) {
  res.send('<h2>This is a demo of neo4j, a graph database</h2>');
});

app.get('/data', function (req, res) {
	var query="MATCH (n) RETURN n LIMIT {limit}";
	var params={limit: 100}

	var promise = doDatabaseOperation(query,params)
	promise.then(function (data) {
		res.send(data)
	})

});

app.post('/data', function (req, res) {
	var query="CREATE (n {name:{myParam}}) RETURN n";
	var params={myParam: "Paul"}

	var promise = doDatabaseOperation(query,params)
	promise.then(function (data) {
		res.send(data)
	})

});

var doDatabaseOperation = function (query, params) {
	return new Promise(function (resolve, reject) {
		request.post({
			uri:txUrl,
			headers:{
				"Authorization": "Basic bmVvNG"
			},
			json:{
				statements:[
					{
						statement:query,
						parameters:params
					}
				]
			}
		},
	    function(err,res){
	    	if(err)
	    		reject(err)
	    	else
		    	resolve(res.body)
	    })
	});	
}

module.exports = app;