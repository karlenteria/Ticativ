const express = require('express');
const { isObjectIdOrHexString } = require('mongoose');
const Carts = require('../models/Carts');
const router = express.Router();


//Model
const Cart = require('../models/Carts');
const User = require('../models/Users')
const Artproducts = require('../models/Artproducts')



// Add new cart
router.post('/addToCart', async( request, response ) => {
    let ObjectId = require('mongodb').ObjectId
    let newCart = new Cart ({
        user: request.body.user,
        products : [
            request.body.product
        ]
    });

    Cart.findOne({
        user: ObjectId(request.body.user)
    }).then(result => {
        // response.send({
        //     result: result
        // })
        if (result == null) {
            
            newCart.save().then( result => {
                response.send({
                    status: result
                })

            
            });
        }else {
            Cart.updateOne(
                {_id :result.id},
                {$push: {
                    products: [request.body.product] 
                }}
            ).then(result => {
                   if(result.modifiedCount === 1){
                         
                        const productId = ObjectId(request.body.product)
                        //Update artProductStatus
                        Artproducts.updateOne(
                            {_id : productId},
                            {status : 'not available'}
                        ).then (result =>{
                            response.send({
                                status: result
                            })
                        })
                             
                   } 
                }
            );
           
        }
    });

});


// delete remove product
router.put('/removeToCart', async( request, response ) => {
    let ObjectId = require('mongodb').ObjectId
    console.log(Cart.products)
    // newProducts = Cart.products.filter( product => 
    //     product !== request.body.product )
    //     console.log(newProducts) 


   Cart.findOne({
        user: ObjectId(request.body.user)
   }).then (result => {
         
    const newProducts = result.products.filter(product => {
        product !== request.body.product
    });


    Cart.updateOne(
        {_id :result.id},
        { products : newProducts }
    ).then(result => {
                response.send({
                    result: result
                })      
         
        }
    );
})
});

   //Get all Users
router.post('/userCart',( request, response) => {
    let ObjectId = require('mongodb').ObjectId
    Cart.findOne({
        user: ObjectId(request.body.user)
    }).then( result => {
        response.send( result);
    })
});

//get specific product base on id
router.post('/cartProduct',( request, response) => {
    let ObjectId = require('mongodb').ObjectId
    let id = ObjectId(request.body.productId)
    Artproducts.findOne({
        _id: id
    }).then( result => {
        response.send( result);
    })
});


         


    module.exports = router;
