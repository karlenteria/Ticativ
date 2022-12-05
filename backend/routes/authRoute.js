const express = require('express');
const router = express.Router();

//model
const User = require( '../models/Users' );

//BCrypt
const bcrypt = require('bcrypt');

// Register User
router.post('/register', async ( request, response) => {
    const hashedPassword = await bcrypt.hash( request.body.password, 10);
    const newUser = new User({
        ...request.body,
        password: hashedPassword
    });

    newUser.save().then( result => {
        response.send({ 
            status: 'User Created'
        });
    });
});

// Check if email is already in use or not
router.post('/register/confirmEmail', async ( request, response ) => {
    User.findOne({
        email: request.body.email
    }).then( result => {
        if (result === null) {
            response.send({
                status: 'no email found'
            });
        }else {
            response.send({
                status: 'email is already used'
            })
        }
    })
} )



// Check if mobile number is already use or not
router.post('/register/confirmMobileNUmber', async ( request, response) => {
    User.findOne({
        mobileNumber: request.body.mobileNumber
    }).then(result => {
        if ( result === null){
            response.send({
                status: 'no mobile number found'   
            });
        }else {
            response.send({
                status: 'already have this number'
            });
        }
    });
});


// Login with email and password 
router.post('/loginWithEmail', (request, response ) => {
    User.findOne({
        email: request.body.email
    }).then(result => {
        if (result === null) {
            response.send({
                status: 'invalid credentials'
            });
        }else{
            bcrypt.compare(
                request.body.password,
                result.password,
                (err, match) => {
                    if (match) {
                        response.send({
                            status: "valid credentials",
                            user: {
                                id: result._id,
                                fullname: result.fullname,
                                description: result.description,
                                userType: result.userType
                            }
                        })
                    }else{
                        response.send({
                            status: "invalid credentials"
                        })
                    }
                    
                    })
                }
            });
});


// Login with mobile number and password 
router.post('/loginWithNumber', (request, response ) => {
    User.findOne({
        mobileNumber : request.body.mobileNumber
    }).then(result => {
        if (result === null) {
            response.send({
                status: 'invalid credentials'
            });
        }else{
            bcrypt.compare(
                request.body.password,
                result.password,
                (err, match) => {
                    if (match) {
                        response.send({
                            status: "valid credentials",
                            user: {
                                id: result._id,
                                fullname: result.fullname,
                                description: result.description,
                                userType: result.userType
                            }
                        })
                    }else{
                        response.send({
                            status: "invalid credentials"
                        })
                    }
                    
                    })
                }
            });
});

module.exports = router;