const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    
    
    name: {
        type: String,
        
    },
    
    email: {
        type: String,
        
    },
    
    phone: {
        type: Number,
        
    },

    date: {
        type: Date,
        
    },

    city: {
        type: String,
        
    },

    county: {
        type: String,
        
    },

    medication: {
        type: String,
        
    },

   
})

module.exports = mongoose.model("message", messageSchema)
