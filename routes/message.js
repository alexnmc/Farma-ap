const express = require('express')
const messageRouter = express.Router()
const Message = require("../models/message")



messageRouter.get('/', (req, res) => {    // get all for testing with postman 
    Message.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})



messageRouter.get('/2/:city', (req, res, next) => {    
    Message.find({city: req.params.city}, (err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})


messageRouter.delete('/', (req, res, next) => {
    Message.remove((err, data) => {     
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('all messages were succesfully deleted!')
    })
})


messageRouter.delete('/:id', (req, res, next) => {
    Message.findOneAndDelete({_id:req.params.id} , (err, data) => {     
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('Mesajul dumneavoastrã a fost șters. Mulțumim cã ați folosit serviciile noastre!')
    })
})


messageRouter.post('/',  (req, res, next) => {   
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
 

messageRouter.put('/:id',  (req, res, next) => {   
        Message.findOneAndUpdate(
                {_id: req.params.id},
                req.body,                          
                {new: true},                   
                (err, updatedMessage) => {
                    if (err) {
                        res.status(500)
                        return next(err)
                    }
                    return res.status(201).send(updatedMessage)
                }
        )
})



module.exports = messageRouter



