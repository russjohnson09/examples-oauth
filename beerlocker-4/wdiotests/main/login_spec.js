var expect = require('chai').expect;

const PORT = process.env.PORT || 8080;
const baseurl = 'http://localhost:' + PORT;


const authorizeurl = baseurl + '?client_id=this_is_my_id&response_type=code' +
    '&redirect_uri=' + baseurl;

    describe('authorize application page', function() {
        it('should be able to login', function() {
            browser.url(authorizeurl);
            // filtering property commands

            $('button').click();

            browser.waitForVisible('form#create-todo');

            expect(browser.isVisible('form#create-todo'), 'todo form is visible').to.be.true;

        });
    });
