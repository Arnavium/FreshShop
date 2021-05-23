var mongoose = require('mongoose');

var CartSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
          },
  totalPrice: { type: Number, default: 0},
  items: [{
        item:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product'
            },
        quantity: { type: Number},
        price: { type: Number},
        image: {type:String},
        itemname: {type:String},
        seller:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
        },
    }]
});

module.exports = mongoose.model('Cart', CartSchema);
