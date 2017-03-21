// https://github.com/typicode/lowdb

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const lowdb = require('lowdb');
const uuidV1 = require('uuid/v1');
const db = lowdb(path.join('.', 'db.json'));
const winston = require('winston');

const urlencode = require('urlencode');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;


const url = require('url');

function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}




// Set some defaults if your JSON file is empty
db.defaults({
        clients: [],
        users: []
    })
    .write();

db.set('users', [{
        id: 'user_id',
        username: 'admin',
        password: 'admin'
    }])
    .write();

db.set('clients', [{
        id: 'client_id',
        secret: 'client_secret'
    }])
    .write();

var app = express();

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser.json());




// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());




// Create our Express router
var router = express.Router();



// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
    .get(
        //authorize request
        function(req, res, next) {
            if (!req.isAuthenticated()) {
                return res.redirect('/login');

            }
            next();
        },
        //process request
        function() {
            res.end('success');
        })
    .post(
        //authorize request
        function() {

        },
        //process request
        function() {}
    );


passport.serializeUser(function(user, done) {
    winston.info('serializeUser');
    winston.info(user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    winston.info('deserializeUser');
    winston.info(id);
    var user = // find single post
        db.get('users')
        .find({
            id: id
        })
        .value();
    done(null, user);
});

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        winston.info('local strategy start');
        winston.info(username);
        var user =
            db.get('users')
            .find({
                username: username
            })
            .value();

        winston.info(user);

        if (!user) {
            winston.info('user not found');
            return done(null, false);
        }
        else {
            return done(null, user)
        }
    }
));


//http://passportjs.org/docs/authenticate
router.post('/login', function(req, res, next) {
    winston.info('attempt login pre passport authenticate');
    winston.info(req.body);
    return passport.authenticate('local', function(err, user, info) {
        winston.info('passport.authenticate');
        if (err) {
            winston.error(err);
            return next(err);
        }

        if (user !== false) {
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                res.status(201);
                res.json({
                    status: 'success'
                });
            });

            return;
        }
        else {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.status(401);
            return res.end(JSON.stringify({
                "message": 'Unauthorized',
                status: "unauthorized"
            }));
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/users/me');
        });
    })(req, res, next);
});


var authenticatedRouter = express.Router();

authenticatedRouter.use(function(req, res, next) {
    winston.info('authentication status');
    winston.info(req.isAuthenticated());
    winston.info(req.user);
    if (!req.isAuthenticated()) {
        res.status(401);
        return res.json({
            "message": 'Unauthorized',
            status: "unauthorized"
        });
    }
    next();
});

authenticatedRouter.get('/users/me', function(req, res, next) {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
})


router.get('/ping', function(req, res, next) {
    res.end('hello');
});


app.use('/v1', router);
app.use('/v1', authenticatedRouter);



var oauthRouter = express.Router();

//client_id
//redirect_uri
//scope
//state
oauthRouter.get('/login/oauth/authorize', function(req, res, next) {
    winston.info('oauth');
    if (!req.query) {
        res.status(400);
        return res.json({
            "message": 'Bad Request',
            status: "bad request"
        });
    }
    //|| !req.query.redirect_uri
    if (!req.query.client_id) { // || !req.query.state) {
        res.status(400);
        return res.json({
            "message": 'Bad Request',
            status: "bad request"
        });
    }
    var client_id = req.query.client_id;

    var client = db.get('clients')
        .find({
            id: client_id
        })
        .value();

    if (!client) {
        res.status(401);
        return res.json({
            "message": 'Unauthorized',
            status: "unauthorized"
        });
    }

    if (!req.isAuthenticated()) {
        var url = req.protocol + '://' + req.get('host') + req.originalUrl;
        winston.info(url);
        url = urlencode(url);
        winston.info(url);

        return res.redirect('/login?redirect_uri=' + url);
    }


    winston.info(req.query.client_id);
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public', 'login', 'oauth',
            'authorize')
    });
});

oauthRouter.post('/login/oauth/authorize', function(req, res, next) {
    winston.info('oauth');
    if (!req.body) {
        res.status(400);
        return res.json({
            "message": 'Bad Request',
            status: "bad request"
        });
    }
    //|| !req.query.redirect_uri
    if (!req.body.client_id) { // || !req.query.state) {
        res.status(400);
        return res.json({
            "message": 'Bad Request',
            status: "bad request"
        });
    }
    var client_id = req.body.client_id;

    console.log(client_id);
    var client = db.get('clients')
        .find({
            id: client_id
        })
        .value();
        
    winston.info(client);

    if (!client) {
        res.status(401);
        return res.json({
            "message": 'Unauthorized',
            status: "unauthorized"
        });
    }

    if (!req.isAuthenticated()) {
        res.status(401);
        return res.json({
            "message": 'Unauthorized',
            status: "unauthorized"
        });
    }

    
    var code = generateCode();
    db.get('users')
      .find({ id: req.user.id })
      .assign({ code: code})
      .write();
      
    var user = db.get('users')
      .find({ id: req.user.id })
      .value();
    
    res.status(201);

    return res.json({
        code: user.code,
        meta: {
            "message": 'Success',
            status: "success"
        }
    });


    winston.info(req.query.client_id);
    res.sendFile('index.html', {
        root: path.join(__dirname, 'public', 'login', 'oauth',
            'authorize')
    });
});


function generateCode()
{
    return '1';
}



app.use('', oauthRouter);

app.use(express.static(path.join('.', 'public')));



// Start the server
var server = app.listen(PORT, function() {
    console.log(server.address().port);
});
