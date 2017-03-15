// https://github.com/typicode/lowdb



var app = express();

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();


// Start the server
var server = app.listen(process.env.PORT,function() {
    console.log(server.address().port);
});