const expect = require('chai').expect;
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

function BasicAuth(username, password) {
    return {
        'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
    };
}

describe(basename, function() {

    it('create user', function(done) {
        username = Moniker.choose();
        password = 'password';
        authenticator = www_authenticate.authenticator(username, password);

        // var my_credentials= www_authenticate.user_credentials("Me","My Password");
        // winston.info(my_credentials);
        // console.log(my_credentials);
        // return done();

        // options = {'method':'GET','path':'/api/clients'};
        // authenticator.authenticate_request_options(options);
        // if (authenticator.err) throw err;
        // winston.info(options);

        // winston.info(username);
        request.post({
            form: {
                'username': username,
                'password': password
            },
            url: baseurl + '/api/users'
        }, function(error, response, body) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.equal(200);

            logger.info(body);
            userBasicAuthHeaders = BasicAuth(username, password);
            done();
        })
    });


    it('unauthorized fails to create client', function(done) {

        winston.info(username);
        request.post({
            form: {

                'username': username,
                'password': 'password'
            },
            url: baseurl + '/api/clients'
        }, function(error, response, body) {
            expect(error).to.be.null;
            expect(response.statusCode).to.be.equal(401);

            logger.info(body);
            logger.info(response.statusCode);
            logger.info(response.headers);
            done();
        })
    })

    it('create client', function(done) {

        request.post({
            headers: userBasicAuthHeaders,
            form: {
                name: username,
                id: 'this_is_my_id',
                secret: '123',
                // userId: '123',
            },
            url: baseurl + '/api/clients'
        }, function(error, response, body) {
            expect(error).to.be.null;
            logger.info(body);
            done();
        })
    })
})
