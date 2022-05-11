const mongoose = require('mongoose')

const productOrderedSchema = new mongoose.Schema({
    
    id:{
        type: Number,
        
    },
    quantity:{

        type: Number,

    },
    date:{
        type:Date,
        default: Date.now
    },


})

module.exports = mongoose.model('ProductOrdered',productOrderedSchema)