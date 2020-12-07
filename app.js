const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//view engine setup
app.engine('handlebars', exphbs({
    extname: "handlebars",
    defaultLayout: false,
    layoutsDir: "views/"
}));
app.set('view engine', 'handlebars');

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('contact');
});

app.listen(3000, () => {
    console.log('server started');
    console.log('Server running at: localhost:3000');
});