var Product = require("../models/product")

exports.getAll = function(filter) {
    return Product.find(filter).exec();
}
exports.getOne = function(filter) {
    return Product.findOne(filter).populate("comments").exec();
}
exports.add = async function(product) {
    const newProduct = new Product(product);
    return await newProduct.save();
}
exports.updateproduct = function(id, product){
    return Product.findByIdAndUpdate(id, product);
}
exports.deleteproduct = async function(id){
    const product = await Product.findById(id);
    return await product.remove();
}