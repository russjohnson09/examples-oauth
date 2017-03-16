// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port

var morgan = require('morgan'); 		// log requests to the console (express4)

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console

// routes ======================================================================
// require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port,function() {
    console.log("App listening on port " + port);
});
