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

app.post('/send', (req,res) => {
    const output = `
    <p> You have a new contact request</p>
    <h3>Contact details</h3>
    <u>
      <li>Name: $(req.body.name)</li>
      <li>Company: $(req.body.conpany)</li>
      <li>Email: $(req.body.email)</li>
      <li>Phone: $(req.body.phone)</li>
    </u>  
    <h3>Message</h3>
    <li> $(req.body.message)</li>
    `
    console.log(req.body);

    let transporter = nodemailer.createTransport({
        host: "mail.smtp2go.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'ankushmishra0939@gmail.com', // generated ethereal user
          pass: '', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Ankush &apos s Node Mailer" <ankushmishra0939@gmail.com>', // sender address
        to: "req.body.email", // list of receivers
        subject: "Node Contact Test", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.render('contact', {msg: 'mail has been sent'});
});

app.listen(3000, () => {
    console.log('server started');
    console.log('Server running at: localhost:3000');
});