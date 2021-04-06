const express = require("express");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');
const path = require("path")


let app = express()

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

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
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- CSS only -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <title>Mailed Successfully</title>
        </head>
        <body>
            <div class="container mt-4">
                <div class="alert alert-success" role="alert">
        Message Sent Successfully
        <br>
            <button type="button" class="btn btn-success mt-4" id="back-btn">Back</button>
        </div>

        <script>
            const back_btn = document.getElementById("back-btn");
            back_btn.onclick = () => {
                window.history.back(-1)
            }
        </script>
            </div>
        </body>

        </html>
    `)

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    main().catch(e => {
        console.log(e)
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- CSS only -->
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <title>Error Sending Mail</title>
        </head>
        <body>
            <div class="container mt-4">
            <div class="alert alert-danger" role="alert">
            Message Error: Not Sent Successfully
            <br>

            <button type="button" class="btn btn-danger mt-4" id="back-btn">Back</button>
        </div>
        </div>

        <script>
            const back_btn = document.getElementById("back-btn");
            back_btn.onclick = () => {
                window.history.back(-1)
            }
        </script>
        </body>

        </html>
    `)
    });
});

app.listen(process.env.PORT || 3000, console.log("Server Started"));

module.exports = app
