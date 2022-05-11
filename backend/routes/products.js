const express = require("express");
const router = express.Router();
const db = require("../database/db.js");
const Product = require("../model/product")

// GET ALL PRODUCTS
router.get("/", async (req, res) => {

  try{
    const products = await Product.find()
    res.json(products)
    }
    catch(err){
    res.send('Error'+ err)
    }
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  
  try{
    const products = await Product.findOne({"id":productId})
    res.json(products)
    }
    catch(err){
    res.send('Error'+ err)
    }
});
router.post("/", async (req, res) => {
  const product = new Product({
    shop_id : req.body.shop_id,
    id : req.body.id,
    title: req.body.title,
    category :req.body.category,
    short_desc :req.body.short_desc,
    image :req.body.image,
    price :req.body.price,
    quantity :req.body.quantity,
    images :req.body.images,

})


try{
   
    const a1 = await product.save()
    res.send(a1)
}catch(err){
    res.send(err)
}
});
router.get("/product_shop/:shop_id", async (req, res) => {
  const { shop_id } = req.params;
  
  try{
    const products = await Product.find({"shop_id":shop_id})
    res.json(products)
    }
    catch(err){
    res.send('Error'+ err)
    }
});

module.exports = router;

