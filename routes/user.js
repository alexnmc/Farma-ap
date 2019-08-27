const express = require("express")
const User = require("../models/user");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

//post a new user to user collection (signing up)
authRouter.post("/signup", (req, res, next) => {
    User.findOne({username: req.body.username}, (err, existingUser) => {
        
        if (err) {
            res.status(500)
            return next(err)
        }
        if (existingUser) {
               res.status(400)
               return next(new Error ("Adresa de email este deja inregisratã!"))
        }
        const newUser = new User(req.body);
        newUser.save((err, addedUser) => {
            if (err) {
             res.status(500)
             return next(err)
        }
            return res.status(201).send({user: addedUser.withoutPassword(), success: 'success'})
        });
    });
});

authRouter.post("/login", (req, res, next) => {
    // Try to find the user with the submitted username 
     User.findOne({username: req.body.username}, (err, user) => {
        
        if (err) {
        res.status(500)
        return next(err)
        }

        if (user && !user.confirmed) {
            return res.status(200).send({user:user.withoutPassword()})
        }
        // If that user isn't in the database:
        if (!user ) {
             res.status(403)
             return next(new Error( "Email greșit!"))
        }

         user.checkPassword(req.body.password, (err, match)=>{ //this function runs the check password method from the schema, it decrypts the password and compares it w the users input

            if(err){
                res.status(500)
                return next(err)
            }
            
            if(!match){
                res.status(403)
             return next(new Error("Parolã greșitã!")) //if password does not match send back this error
            }

            const token = jwt.sign(user.withoutPassword(), process.env.SECRET) //if match is true create token

             // Send the token back to the client app.
            return res.send({token: token, user: user.withoutPassword(), success: true})
       })
    })
})




authRouter.get('/:city', (req, res, next) => {    // get all for testing with postman 
    User.find({city: req.params.city}, (err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)
    })
})

authRouter.get('/', (req, res, next) => {    // get all for testing with postman 
    User.find((err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)

    })
})

authRouter.get('/by/:id', (req, res, next) => {    // get all for testing with postman 
    User.findOne({_id: req.params.id},(err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(data)

    })
})

authRouter.get('/reset/:email', (req, res, next) => {    // get all for testing with postman 
    User.findOne({username: req.params.email, confirmed: true} ,(err, data) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(data){ 
            return res.status(200).send({confirmed:"Confirmed", id: data._id})
        } else {   
            return res.status(200).send({confirmed: "Email necunoscut!"})
    }
})
})

authRouter.put('/reset/:id', (req, res, next) => {    // reset password
    bcrypt.hash(req.body.password, 10, (err, hash) => {// encrypts the new password
        if (err) return next(err)
        req.body.password = hash
        
        User.findOneAndUpdate(
        {_id: req.params.id},
         req.body,                           
        {new: true},                
        (err, updatedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send("Parola a fost schimbatã!")
        }
    )
    })
})

authRouter.put('/activate/:id', (req, res, next) => {    // activate user
    User.findOneAndUpdate(
        {_id: req.params.id},
         req.body,                           
        {new: true},                
        (err, updatedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send("Activated!")
        }
    )
})

authRouter.delete('/', (req, res, next) => {
    User.remove((err, data) => {      // for testing, deletes everything on the /auth endpoint!
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(202).send(` all users were succesfully deleted `)
    })
})

authRouter.delete('/:id', (req, res, next) => {    
    User.findOneAndDelete({_id: req.params.id} , (err, data) => {
       if (err) {
           res.status(500)
           return next(err)
       }
       return res.status(202).send('user deleted')
   })
})




module.exports = authRouter
