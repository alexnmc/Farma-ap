const mongoose = require('mongoose')
const Schema = mongoose.Schema

const linkSchema = new Schema({
    
    linkID: {
        type: String,
        required: true
    },

    userID:{
        type: String,
        required: true
    },

})

module.exports = mongoose.model("link", linkSchema)
