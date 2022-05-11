
const mongoose = require('mongoose')
const url ='mongodb://localhost/emporium_data'

//CONNECT USING MONGOOSE TO DB

mongoose.connect(url,{useNewUrlParser: true})
const con = mongoose.connection

try{
    con.on('open',()=>{
        console.log('Connected to db')
    })
}catch(err){
    console.log('Error' + err)
}

module.exports = con;
