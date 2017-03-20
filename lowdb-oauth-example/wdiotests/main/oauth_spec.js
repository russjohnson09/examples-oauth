var expect = require('chai').expect;


const baseurl = "http://localhost:" + process.env.PORT || 3000;


describe('login page', function() {
    it('should be able to login', function () {
        browser.url(baseurl+'/login/oauth/authorize/?client_id=client_id');
        // filtering property commands
        
        browser.waitForVisible('input[name=\'username\']');

        $('input[name=\'username\']').setValue('admin');
        $('input[name=\'password\']').setValue('admin');

        $('button[type=\'submit\']').click();


        expect(browser.isVisible('form#create-todo'),'todo form is visible').to.be.true;

    });
});