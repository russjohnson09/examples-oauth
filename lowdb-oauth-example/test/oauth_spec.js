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

  describe("basic", function() {

    it('/v1/users/me GET Authorization: token', function(done) {
      var token = 'test_token123';
      token = 'admin_token';
      // db.get('oauth_tokens')
      //   .push({
      //     id: 'test_token123', //uuidV1(), //'admin_token',
      //     user_id: 'user_id',
      //     client_id: 'client_id'
      //   })
      //   .write();

      request.get({
        followRedirect: false,
        url: baseurl + '/v1/users/me',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'token ' + token
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
