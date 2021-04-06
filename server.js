const express = require("express");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');
const path = require("path")


let app = express()

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'public')))

app.post('/contact-us', function (req, res) {
    const {name, mail, subject, message} = req.body
    async function main() {
    let transporter = nodemailer.createTransport({
        host: "mail.trisenboilservices.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "info@trisenboilservices.com", // generated ethereal user
          pass: "TUbo@2252", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"${name}" <${mail}>`, // sender address
        to: "info@trisenboilservices.com", // list of receivers
        subject: `${subject}`, // Subject line
        text: `${message}`, // plain text body
        // html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
    res.render('Success', {title: "Mailed Successfully"})

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(e => {
        console.log(e)
        res.render("Error", {title: "Error Sending Mail"})
    });
});

app.listen(process.env.PORT || 3000, console.log("Server Started"));

module.exports = app
