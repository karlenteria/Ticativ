const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullname: String,
    description: String,
    username: String,
    email: String,
    password: String,
    mobileNumber: String,
    dateOfBirth: Date,
    userType:  String,
    address: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },

    artProducts: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Artproduct'
        }
    ],

    orders: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);








































