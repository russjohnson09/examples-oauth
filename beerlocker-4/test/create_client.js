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


describe(basename, function() {

    it('create user', function(done) {
        username = Moniker.choose();
        password = 'password';
        www_authenticate.authenticator(username, password);

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
    });

    it('create client', function(done) {

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
    })
})
