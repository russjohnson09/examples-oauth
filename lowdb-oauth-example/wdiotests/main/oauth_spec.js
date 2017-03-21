var expect = require('chai').expect;


const baseurl = "http://localhost:" + (process.env.PORT || 3000);


// http://localhost:3000/login/oauth/authorize/?client_id=client_id&redirect_url=localhost:3000%2Flogin%2Flink

describe('login page', function() {
    it('should be able to login', function () {
        browser.logger.info(baseurl+'/login/oauth/authorize/?client_id=client_id');
        // return;
        browser.url(baseurl+'/login/oauth/authorize/?client_id=client_id');
        // filtering property commands
        
        //redirected to login page
        browser.waitForVisible('input[name=\'username\']');
        
        browser.setValue('input[name=\'username\']','admin');
        browser.setValue('input[name=\'password\']','admin');

        // $().setValue('admin');
        // $('input[name=\'password\']').setValue('admin');

        // $('button[type=\'submit\']').click();
        
        expect(browser.getValue('input[name=\'username\']')).to.be.equal('admin');

        
        browser.click('button[type=\'submit\']');
        


        // return;
        // expect(browser.isVisible('form#create-todo'),'todo form is visible').to.be.true;

    });
});