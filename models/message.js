const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    
    
    email: {
        type: String,
        
    },
    
    phone: {
        type: Number,
        required: true
        
    },

    date: {
        type: Date,
        
    },

    city: {
        type: String,
        required: true
    },

    medication: {
        type: String,
        required: true
        
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
