const express = require('express')
const linkRouter = express.Router()
const Link = require("../models/link")



linkRouter.post('/',  (req, res, next) => {   
   const newLink = new Link(req.body)
        newLink.save((err, link) => {
            if (err) {
                res.status(500)
                return next(err)
            }
                return res.status(201).send(link)
        })
})


linkRouter.get('/:id', (req, res) => {    
    Link.find({linkID: req.params.id}, (err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})


linkRouter.get('/', (req, res) => {    // get all for testing with postman 
    Link.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})


linkRouter.delete('/:id', (req, res, next) => {
    Link.findOneAndDelete({linkID: req.params.id} , (err, data) => {     
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('sters')
    })
})


linkRouter.delete('/', (req, res, next) => {
    Link.remove((err, data) => {     
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send('sters')
    })
})




module.exports = linkRouter

