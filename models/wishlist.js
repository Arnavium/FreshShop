var mongoose = require('mongoose');

var WishListSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
          },
  items: [{
    item: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'
    },
    price: { type: Number, default: 0},
    image: String,
    itemname: String,
  }]
});

module.exports = mongoose.model('WishList', WishListSchema);