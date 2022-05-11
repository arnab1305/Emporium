
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    shop_id:{

        type: String,
        required:true

    },
    id:{
        type: Number,
        
    },
    title:{

        type: String,
        

    },
    category:{

        type: String,
        

    },
    short_desc:{

        type:String,
       

    },
    image:{
        type:String,
        
    },
    price:{
        type:Number,
        
    },
    quantity:{
        type:Number,
    
    },
    images:{
        type:String,
    },

})

module.exports = mongoose.model('Product',productSchema)