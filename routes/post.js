const express = require('express')
const messagesRouter = express.Router()
const Message = require("../models/message")



messagesRouter.post('/',  (req, res, next) => {   
    Message.findOne({name: req.body.name, phone:req.body.phone, medication:req.body.medication, city: req.body.city, date: req.body.date}, (err, message) => {
        if (err) {
            res.status(500)
            return next(err)
        } if(message){ 
            return res.status(200).send("Mesaj dublu!")
        } else {   
            const newMessage = new Message(req.body)
            newMessage.save((err, message) => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(201).send("Mesaj trimis!")
            })
        }   
    }
)})



module.exports = messagesRouter
