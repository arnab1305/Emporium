const express = require("express");
const router = express.Router();
const db = require("../database/db");
const userController = require("../controllers/userController");
const User = require("../model/user")

// Get all users
router.get("/:email", async (req, res) => {
  try{
    const user = await User.findOne({email : req.params.email})
    user.__v ++;
    const a1 = await user.save()
    res.json(user)
    }
    catch(err){
    res.send('Error'+ err)
    }
});



router.put("/:userId", userController.update_user);

module.exports = router;
