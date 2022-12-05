const mongoose = require('mongoose');
const populate = require('mongoose-autopopulate');

const CartSchema = new mongoose.Schema({
    status: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products : [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artproduct',
            autopopulate: true
        }
    ]
});
CartSchema.plugin(populate);
module.exports = mongoose.model('Cart', CartSchema);
