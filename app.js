const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getYear', () => {
    return new Date().getFullYear()
})
app.use(express.static(__dirname+'/public'));
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

app.get('/', (req, res) => {
    res.render('home.hbs', {
        text: 'Welcome to my website',
        year: new Date().getFullYear()
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        year: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log('Server up on port 3000');
});