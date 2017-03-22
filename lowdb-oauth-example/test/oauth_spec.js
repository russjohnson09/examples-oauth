const expect = require('chai').expect;

const request = require('request');
const path = require('path');
const winston = require('winston');
const lowdb = require('lowdb');
const uuidV1 = require('uuid/v1');
const db = lowdb(path.join('..', 'db.json'));

const CONSOLE_LOG_LEVEL = process.env.CONSOLE_LOG_LEVEL || 'info';

winston.loggers.add('testlogger', {
  transports: [
    new(winston.transports.Console)({
      level: CONSOLE_LOG_LEVEL
    }),
  ]
});

var logger = winston.loggers.get('testlogger');

baseurl = "http://localhost:" + 3000;
alexaurl = baseurl + '/v1/alexa';





describe(path.basename(__dirname), function() {


  describe('get access_token from code to be used to authorize', function() {

    it('/login/oauth/access_token POST', function(done) {

      var requestBody = {
        client_id: 'client_id',
        client_secret: 'client_secret',
        code: '1'
      };

      request.post({
        followRedirect: false,
        url: baseurl + '/login/oauth/access_token',
        body: JSON.stringify(requestBody),
        headers: {
          'content-type': 'application/json',
          // 'Authorization': 'token ' + token
        }
      }, function(error, response, body) {
        expect(error).to.be.null;
        logger.info(body);
        body = JSON.parse(body);
        logger.info(JSON.stringify(body, null, '    '));
        expect(response.statusCode).to.be.equal(201);
        
        expect(body.access_token).not.to.be.undefined;
        expect(body.access_token).not.to.be.null;
        
        access_token = body.access_token;
        done();
      });
    });
  })


  describe("basic authorization", function() {

    it('/v1/users/me GET Authorization: token', function(done) {

      request.get({
        followRedirect: false,
        url: baseurl + '/v1/users/me',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'token ' + access_token
        }
      }, function(error, response, body) {
        expect(error).to.be.null;
        logger.info(body);
        body = JSON.parse(body);
        logger.info(JSON.stringify(body, null, '    '));
        expect(response.statusCode).to.be.equal(200);
        done();
      });
    })
  })

})
