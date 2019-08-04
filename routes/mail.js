const express = require('express')
const mailRouter = express.Router()
const nodemailer = require('nodemailer');


mailRouter.post('/', (req, res) => {
    console.log(req.body.sendTo.join(','))
  
   const output = `
     
        <h2>Mesaj nou:</h2>
          <h3>Name: ${req.body.name}</h3>
          <h3>Phone: ${req.body.phone}</h3>
          <h3>Cautã: ${req.body.medication}</h3>  
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
        to: req.body.sendTo.join(','), // list of receivers
        subject: 'New Mail', // Subject line
        html: output // html body
    }

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(201).send(error)
    } else {
        res.status(201).send('Email sent: ' + info.response);
    }
    })

    
})

module.exports = mailRouter