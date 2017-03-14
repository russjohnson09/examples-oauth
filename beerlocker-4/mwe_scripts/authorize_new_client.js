const request = require('request');
const path = require('path');
const basename = path.basename(path.join('.', __filename));
const winston = require('winston');
const DEFAULT_LOG_LEVEL = process.env.DEFAULT_LOG_LEVEL || 'info';
const PORT = process.env.PORT || 8080;
const baseurl = 'http://localhost:' + PORT;
var Moniker = require('moniker');

const www_authenticate = require('www-authenticate');






const logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            level: DEFAULT_LOG_LEVEL
        }),
    ]
});

var options = {
   host: 'test.example.com',
   port: 443,
   path: '/api/service/'+servicename,
   // authentication headers
   headers: {
      
   }   
};
//this is the call
request = https.get(options, function(res){
   var body = "";
   res.on('data', function(data) {
      body += data;
   });
   res.on('end', function() {
    //here we have the full response, html or json object
      console.log(body);
   })
   res.on('error', function(e) {
      onsole.log("Got error: " + e.message);
   });
	});
	
username = Moniker.choose();
password = 'password';
authenticator = www_authenticate.authenticator(username, password);

var my_credentials = www_authenticate.user_credentials("Me", "My Password");
winston.info(my_credentials);
return;
console.log(my_credentials);
// return done();

options = {
    'method': 'GET',
    'path': '/api/clients'
};
authenticator.authenticate_request_options(options);
if (authenticator.err) throw err;
winston.info(options);

winston.info(username);
request.post({
    form: {
        'username': username,
        'password': password
    },
    url: baseurl + '/api/users'
}, function(error, response, body) {
    expect(error).to.be.null;
    logger.info(body);
    done();
})

winston.info(username);
request.post({
    form: {
        'username': username,
        'password': 'password'
    },
    url: baseurl + '/api/clients'
}, function(error, response, body) {
    expect(error).to.be.null;
    logger.info(body);
    done();
})
