var mongoose = require('mongoose');

var orderitemSchema = new mongoose.Schema({
    totalPrice: { type: Number, default: 0},
    items: { 
        item: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product'
        },
        quantity: {type: Number},
        price: {type: Number},
        image: {type:String},
        itemname: {type:String},
        seller:{      
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        }
    },
    payment: {type:String, default:null},
    status: {type:String, default:null},
    orderDate: {type:String, default:null},
    deliveryDate: {type:String, default:null},
    returnDate: {type:String, default:null},
    msg:{type:String, default:null},
    address: {
        name:{type:String, default:null},
        line:{type:String, default:null},
        city:{type:String, default:null},
        state:{type:String, default:null},
        country:{type:String, default:null},
        postal:{type:String, default:null},
        email:{type:String, default:null},
        phone:{type:String, default:null}
    }
  });
  
  module.exports = mongoose.model('OrderItem', orderitemSchema);