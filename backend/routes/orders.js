const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const ProductOrder = require('../model/product-ordered')
const Product = require('../model/product')
const User = require('../model/user')


router.post("/create", orderController.create_order);

router.post("/", async(req,res)=>{

  
    const order = new ProductOrder({
       
        id: req.body.id,
        quantity: req.body.quantity

    })
    
  
    try{
       
        const a1 = await order.save()
        res.send(a1)
    }catch(err){
        res.send(err)
    }
  });


router.get("/:email",async(req,res)=>{

    try {
        
        const user = await User.find({email:req.params.email})
        const objects = await Product.find({shop_id:user[0].shop_id})
        var janAmount=0, febAmount = 0, marAmount = 0, aprAmount = 0, mayAmount = 0, junAmount = 0, julAmount = 0, augAmount = 0, sepAmount = 0, octAmount = 0, novAmount = 0, decAmount = 0
        for(var val2 of objects){

            const products = await ProductOrder.find({id:val2.id})
            for(var val of products){

                if(val.date.getMonth()+1 == 1){

                    janAmount = janAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 2){

                    febAmount = febAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 3){

                    marAmount = marAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 4){

                    aprAmount = aprAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 5){

                    mayAmount = mayAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 6){

                    junAmount = junAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 7){

                    julAmount = julAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 8){

                    augAmount = augAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 9){

                    sepAmount = sepAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 10){

                    octAmount = octAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 11){

                    novAmount = novAmount + val.quantity;

                }
                if(val.date.getMonth()+1 == 12){

                    decAmount = decAmount + val.quantity;

                }
                
            }

        }
        
        res.json({

            "Jan":janAmount,
            "Feb":febAmount,
            "Mar":marAmount,
            "Apr":aprAmount,
            "May":mayAmount,
            "Jun":junAmount,
            "Jul":julAmount,
            "Aug":augAmount,
            "Sep":sepAmount,
            "Oct":octAmount,
            "Nov":novAmount,
            "Dec":decAmount
            
        })

    } catch (error) {
        res.send(error)
    }

});
router.get("/pie/:email",async(req,res)=>{


    try {
        
        const user = await User.find({email:req.params.email})
        const objects = await Product.find({shop_id:user[0].shop_id})
        var total_sale = 0, vehicle_count = 0, stationary_count = 0 , book_count = 0;
        for(var val3 of objects){

            const products = await ProductOrder.find({id:val3.id})
            for(var val4 of products){

                total_sale++;
                const prod = await Product.find({id:val4.id})
                if(prod[0].category == 'vehicle'){

                    vehicle_count++

                }
                if(prod[0].category == 'stationary'){

                    stationary_count++

                }
                if(prod[0].category == 'Book'){

                    book_count++

                }
            }
            
        }
        var vehicle_per = (vehicle_count/total_sale) *100
        var stationary_per = (stationary_count/total_sale) *100
        var book_per = (book_count/total_sale) *100
        res.json({
            "cat1":vehicle_per,
            "cat2":stationary_per,
            "cat3":book_per,
        })
    } catch (error) {
        res.json(error)
    }

})

module.exports = router;
