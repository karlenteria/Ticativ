const express = require('express');
const router = express.Router();

//Model
const User = require('../models/Users');

//ByCrypt
const bcrypt = require('bcrypt');
const { post } = require('./authRoute');


//Get a specific user
router.get('/:id', ( request, response ) => {
    User.findOne(
        { _id: request.params.id },
        { password: 0,})
        .then( (result) => {
            response.send(result);
        });
});

//get Password
router.get('/:id/getPassword', ( request, response ) => {
    User.findOne(
        { _id: request.params.id }
    ).then( ( result ) => {
        const Enpassword = bcrypt.hashSync(result.password, salt) 
        response.send(Enpassword);
    });
});



//Change Password
router.put('/:id/changePassword', async ( request, response) => {
    const userId = request.params.id;
    const  hashedNewpass = await bcrypt.hash(request.body.newPassword, 10)
    User.findOne(
        { _id: request.params.id }
    ).then( ( result ) => {
        bcrypt.compare( 
            request.body.password, 
            result.password,
            ( err, match ) => {
                if (match) {
                    
                    User.updateOne(
                        { _id: userId },
                        { password: hashedNewpass }
                    ).then( result => {
                        if ( result.modifiedCount === 1){
                            response.send({
                                status: 'Updated password',
                                user: result
                            });
                        }
                    })
                    
                }else {
                    response.send({
                        status: " password don't match "
                    })
                }
            });
    })
})

module.exports = router;