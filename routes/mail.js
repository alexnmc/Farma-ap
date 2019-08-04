const express = require('express')
const mailRouter = express.Router()
const nodemailer = require('nodemailer');


mailRouter.post('/', (req, res) => {
    console.log(req.body.sendTo.join(','))
  
   const output = `
     
       
          <h3>Nume: ${req.body.name}</h3>
          <h3>Telefon: ${req.body.phone}</h3>
          <h3>Email: ${req.body.email}</h3>
          <h3>Cautã: ${req.body.medication}</h3>  
        
    `
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farmacieup@gmail.com', // generated ethereal user
        pass: 'farmaup123'  // generated ethereal password
      }
    })
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: 'farmacieup@gmail.com', // sender address
        to: req.body.sendTo.join(','), // list of receivers
        subject: 'Mesaj Nou!', // Subject line
        html: output, // html body
        attachments: [{
          path: req.body.img 
      }]
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