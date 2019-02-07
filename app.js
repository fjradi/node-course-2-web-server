const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
})
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err){
            console.log('Unable to append file');
        }
    })
    next();
})
// app.use((req, res, next) => {
//     res.render('maintenance');
// })
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'HOME PAGE',
        welcomeMessage: 'Welcome to my website'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'ABOUT PAGE'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'PROJECTS'
    });
});

app.listen(port, () => {
    console.log(`Server up on port ${port}`);
});