const express = require('express')
const mailRouter = express.Router()
const nodemailer = require('nodemailer');


mailRouter.post('/', (req, res) => {
    
  const output = `
          <h4>Telefon: <a href="tel:${req.body.phone}">${req.body.phone}</a></h4>
          <h4>Email: ${req.body.email}</h4>
          <h4>Cautã: ${req.body.medication}</h4>  
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
        subject: req.body.medication, // Subject line
        html: output, // html body
        attachments: req.body.img.length && [{path: req.body.img}]
    }

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          res.status(201).send(error)
      } else {
          res.status(201).send('Email sent: ' + info.response);
      }
      })
    })



mailRouter.post('/reset', (req, res) => {
    
  const output = `
     
    <h4>Pentru resetarea parolei: <a href="https://farmacie-app.herokuapp.com/resetpassword/${req.body.linkID}">click aici</a></h4>
    `
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farmacieup@gmail.com', // generated ethereal user
        pass: 'farmaup123'  // generated ethereal password
      }
    })
  
    
    let mailOptions = {
        from: 'farmacieup@gmail.com', // sender address
        to: req.body.sendTo, // list of receivers
        subject: 'Resetare parolã', // Subject line
        html: output, // html body
        
    }

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        res.status(201).send(error)
    } else {
        res.status(201).send('Email sent: ' + info.response);
    }
    })
})


mailRouter.post('/activate', (req, res) => {
    
  const output = `
          <h3>Bine ați venit in rețeaua farma-up!</h3>
          <h4>Vã rugãm sã activați contul: <a href="https://farmacie-app.herokuapp.com/activation/${req.body.id}">click aici</a></h4>
        
    `
  
   
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farmacieup@gmail.com', // generated ethereal user
        pass: 'farmaup123'  // generated ethereal password
      }
    })
  
   
    let mailOptions = {
        from: 'farmacieup@gmail.com', // sender address
        to: req.body.sendTo, // list of receivers
        subject: 'Activare cont', // Subject line
        html: output, // html body
        
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