const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderStatus: String,
    shippingAddress: String,
    dateOrdered: Date,
    paymentType: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    }

});

module.exports = mongoose.model('Order', 'UserSchema');