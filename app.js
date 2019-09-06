const express = require('express'); //web server framework module
const hbs = require('hbs'); //view engine module
const fs = require('fs');
var app = express(); //creating express framework
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs'); //making hbs as view engine
hbs.registerPartials(__dirname+'/views/partials'); //adding partial files like header or footer
hbs.registerHelper('getYear', () => { //adding function which is can be accessed in views
    return new Date().getFullYear()
});
app.use((req, res, next) => { //logger middleware
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err){
            console.log('Unable to append file');
        }
    });
    next(); //kalo gk ada ini nanti stop di middleware
});
app.use(express.static(__dirname + '/public')); //middleware which register access route in public directory

//home route
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'HOME PAGE',
        welcomeMessage: 'Welcome to my website'
    });
});

//about route
app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'ABOUT PAGE'
    });
});

//projects route
app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'PROJECTS'
    });
});

//starting server
app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});