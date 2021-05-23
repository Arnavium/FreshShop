var Comment = require('../models/comment')
var Product = require("../models/product")

exports.getOne = function(filter) {
    return Comment.findOne(filter).exec();
}
exports.add = async function(product_id, comment) {
    const product = await Product.findById(product_id);
    const newcomment = new Comment(comment);
    await newcomment.save();
    product.comments.push(newcomment);
    return await product.save();
}
exports.updatecomment = function(comment_id, comment){
    return Comment.findByIdAndUpdate(comment_id, comment);
}
exports.deletecomment = async function(id){
    const comment = await Comment.findById(id);
    return await comment.remove();
}
