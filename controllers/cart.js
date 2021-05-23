var Cart = require("../models/cart")

exports.getOne = function(filter) {
    return Cart.findOne(filter).exec();
}

exports.add = function(cart) {
    const newCart = new Cart(cart);
    return newCart.save();
}

exports.additem = async function(pid, price, owner, image, name, seller) {
    var found = false;
    var filter = {owner:owner};
    const cart = await Cart.findOne(filter);
    cart.totalPrice = cart.totalPrice + price;
    for(var i=0;i<cart.items.length;i++){
        if(pid == cart.items[i].item){
            cart.items[i].quantity = cart.items[i].quantity + 1;
            found = true;
        }
    }
    if(found == false){
        var quantity = 1;
        var item = pid;
        var itemname = name;
        cart.items.push({item,quantity,price, image, itemname, seller});
    }
    return await cart.save();
}

exports.plus = function(cart, id) {
    const newCart = cart;
    for(var i=0;i<newCart.items.length;i++){
        if(newCart.items[i].item == id){
            newCart.totalPrice = newCart.totalPrice + newCart.items[i].price;
            newCart.items[i].quantity = newCart.items[i].quantity + 1;
            break;
        }
    }
    return newCart.save();
}

exports.minus = function(cart, id) {
    const newCart = cart;
    for(var i=0;i<newCart.items.length;i++){
        if(newCart.items[i].item == id){
            newCart.totalPrice = newCart.totalPrice - newCart.items[i].price;
            newCart.items[i].quantity = newCart.items[i].quantity - 1;
            if(newCart.items[i].quantity == 0)
                newCart.items.splice(i,1);
            break;
        }
    }
    return newCart.save();
}

exports.del = function(cart, id) {
    const newCart = cart;
    for(var i=0;i<newCart.items.length;i++){
        if(newCart.items[i].item == id){
            newCart.totalPrice = newCart.totalPrice - (newCart.items[i].price * newCart.items[i].quantity);
            newCart.items.splice(i,1);
            break;
        }
    }
    return newCart.save();
}

exports.reset = function(cart) {
    const newCart = cart;
    newCart.items = [];
    newCart.totalPrice = 0;
    return newCart.save();
}