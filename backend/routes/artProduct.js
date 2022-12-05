const express = require('express');
const router = express.Router();
const {cloudinary} = require('../upload/cloudinary');
const uploader = require('../upload/upload-multer');



//Model
const User = require('../models/Users');
const artProduct = require('../models/Artproducts');
const { application } = require('express');


//Get all Products
router.get('/allProducts',( request, response) => {
    artProduct.find(
        {status: 'available'}
    ).then( result => {
        response.send( result );
    })
})


// Add new artProduct
router.post('/addNewProduct', uploader.single("file"), ( request, response ) => {
    
    let newArtProduct = new artProduct ({
        ...request.body,
        productPhoto: {
            path: request.file.path,
            filename : request.file.filename
        }
    });
    newArtProduct.save().then( result => {
        response.send({ 
            status: " Added New Art Product",
            result: result
                                        
        })
    });
});









module.exports = router;