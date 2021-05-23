var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    imageURL: [{
        type: String
    }],
    price: Number,
    description: String,
    category: String,
    type: String,
    seller: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

module.exports = mongoose.model("Product",productSchema);