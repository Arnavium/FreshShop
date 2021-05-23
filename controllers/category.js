var Category = require('../models/category')

exports.addnew = function(category){
    const newcategory = new Category(category);
    return newcategory.save();
}

exports.getOne = function(filter) {
    return Category.findOne(filter).exec();
}

exports.getall = function(filter){
    return Category.find(filter).exec();
}

exports.updatecategory = function(id, category){
    return Category.findByIdAndUpdate(id, category);
}

exports.deletecategory = async function(id){
    const product = await Category.findById(id);
    return await product.remove();
}