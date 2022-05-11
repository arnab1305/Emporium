const { number } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName :{
        type: String,
        
        min: 6,
        max: 30
    },
    email:{
        type: String,
        
        max: 255,
        min: 6
    },
    password:{
        type: String,
        
        max: 1024,
        min: 6
    },
    date:{
        type:Date,
        default: Date.now
    },
    shop_id:{

        type:Number,
        

    },

    shop_name:{

        type:String,
       

    },
    cover:{

        type:String,
       

    },
    story:{

        type:String,
        

    },
    categorys:{

        type: Array,

    },
})

module.exports = mongoose.model('User',userSchema)