const express = require("express");
const {
    loginValidation,
    registerValidation,
  } = require("../middleware/validation");
const router = express.Router();
const authController = require("../controllers/authController");
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

router.post("/register", async(req,res)=>{

    //Validator
    
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
  
    //Check existing Email
  
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send('Email exists')
  
    //Hash Password
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password , salt)
  
    const user = new User({
        fullName : req.body.fullName,
        email: req.body.email,
        password :hashPassword,
        shop_id: req.body.shop_id,
        shop_name: req.body.shop_name,
        cover:req.body.cover,
        story:req.body.story,
        category: req.body.category

    })
    
  
    try{
       
        const a1 = await user.save()
        res.send(a1)
    }catch(err){
        res.send(err)
    }
  });

router.put('/update/:email',async(req ,res)=>{

  try{

    const userEmail = await User.findOne({email: req.params.email});
    userEmail.shop_id = req.body.shop_id
    userEmail.shop_name = req.body.shop_name
    userEmail.cover = req.body.cover
    userEmail.story = req.body.story
    userEmail.categorys = req.body.category
    userEmail.hitCounter = 0
    const a1 = await userEmail.save()
    res.json(a1)

  }catch(err){

    res.send(err)

  }

})

router.post("/login", async(req,res)=>{

  //Validator
  
  const {error} = loginValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  //Check existing Email

  const emailExists = await User.findOne({email: req.body.email})
  if(!emailExists) return res.status(400).send('Not registered')
  //Password check
  const validPass = await bcrypt.compare(req.body.password, emailExists.password)
  if(!validPass) return res.status(400).send('Enter Valid Password')

  //Create and assign a token
  const token = jwt.sign({_id: emailExists._id}, 'secret')
  
  res.header('auth-token',token).send(`Welcome ${emailExists.fullName}`)
  
});

module.exports = router;
