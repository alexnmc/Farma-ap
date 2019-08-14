const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    
    
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

    img: {
        type:String,
    },

    toggle: {
        type: Boolean,
        default: true
    },

    rezolvat: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("message", messageSchema)
