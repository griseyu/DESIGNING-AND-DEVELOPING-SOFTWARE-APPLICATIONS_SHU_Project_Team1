// include express and create new express object to interact with the express library
const express = require('express');
const app = express();
const path =require('path');
const router = express.Router();
// var exphbs = require('express-handlebars');

// tells express where our static files are stored
// app.use(express.static(path.join(__dirname, '/CSS')));
// app.use('/Images', express.static('/public'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/Images')));


// app.get('/css/styles.css', function(req, res){ 
//     res.send('css/styles.css'); res.end(); });

// app.use("/", express.static("../CSS"));

// sets the view engine to use handlebars
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// create a route for get requests for the route of our website
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/home.html'));
})
// app.get('/', (req, res) => res.send('Hello World'))

app.get('/makeUp', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/makeUp.html'));
})

app.get('/hairCare', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/hairCare.html'));
})

app.get('/skinCare', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/skinCare.html'));
})

// add the router
app.use('/', router);



// listen on port 3000 and return statement to console
app.listen(3000, () => console.log('Running on port 3000'))