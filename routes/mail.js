const express = require('express')
const mailRouter = express.Router()
const nodemailer = require('nodemailer');


mailRouter.post('/', (req, res) => {
    const output = `
     
      <h3>New mail</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Phone: ${req.body.phone}</li>
      </ul>
     
    `
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nemechekalexander@gmail.com', // generated ethereal user
        pass: 'Panerai1'  // generated ethereal password
      }
    })
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'nemechekalexander@gmail.com', // sender address
        to: 'uj_rudi@hotmail.com', // list of receivers
        subject: 'New Mail', // Subject line
        html: output // html body
    }

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    })

    
})

module.exports = mailRouter