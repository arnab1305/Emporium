const router = require('express').Router();
const {
  loginValidation,
  registerValidation,
} = require("../middleware/validation");
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const User = require("../model/user")

exports.loginUsers = async (params) => {
  
  const {error} = loginValidation(params)
  if(error) return res.status(400).send(error.details[0].message)

  const { email, password } = params;
  

  return new Promise((resolve, reject) => {

    const emailExists =  User.findOne({email: params.email})
    if(!emailExists){
      reject({
        data: err,
        message: 'Not registered',
        statusCode: 400,
      });
    }
    const validPass =  bcrypt.compare(params.password, emailExists.password)
    if(!validPass){
      reject({
        data:err,
        message: "Wrong credentials, please try again",
        statusCode: 400,
      });
    }
    if(validPass&&emailExists){
      const token = jwt.sign({ data: result }, "secret");
          resolve({
            message: "Logged in successfully",
            data: result,
            token,
          });
    }

    // db.query(
    //   "SELECT * FROM users WHERE email = ? AND password = ?",
    //   [email, hashedPassword],
    //   (err, result) => {
    //     if (err) {
    //       reject({
    //         data: err,
    //         message: "Something went wrong, please try again",
    //         statusCode: 400,
    //       });
    //     }

    //     if (result.length === 0) {
    //       reject({
    //         message: "Wrong credentials, please try again",
    //         statusCode: 400,
    //       });
    //     }

    //     if (result.length > 0) {
    //       const token = jwt.sign({ data: result }, "secret");
    //       resolve({
    //         message: "Logged in successfully",
    //         data: result,
    //         token,
    //       });
    //     }
    //   }
    // );
  });
};

// exports.registerUser = async (params) => {
//   const {error} = registerValidation(params)
//   if(error) return res.status(400).send(error.details[0].message)

//   const emailExists = await User.findOne({email: params.email})
//   if(emailExists) return res.status(400).send('Email exists')

//   const salt = await bcrypt.genSalt(10)
//   const hashPassword = await bcrypt.hash(params.password , salt)

//   const user = new User({
//         name : params.name,
//         email: params.email,
//         password :hashPassword
//     })
    

//   try{
       
//       const a1 = await user.save()
//       res.send(a1)
//   }catch(err){
//       res.send(err)
//   }
// };
router.post('auth/register',async(req,res)=>{

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
      name : req.body.name,
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
})
module.exports = router
