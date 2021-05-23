var Wishlist = require("../models/wishlist")

exports.getOne = function(filter) {
    return Wishlist.findOne(filter).exec();
}

exports.add = function(wish) {
    const wishlist = new Wishlist(wish);
    return wishlist.save();
}

exports.additem = async function(pid, price, owner, image, name) {
    var found = false;
    var filter = {owner:owner};
    const wishlist = await Wishlist.findOne(filter);
    for(var i=0;i<wishlist.items.length;i++){
        if(pid == wishlist.items[i].item){
            found = true;
            break;
        }
    }
    if(found == false){
        var item = pid;
        var itemname = name;
        wishlist.items.push({item, price, image, itemname});
    }
    return await wishlist.save();
}

exports.del = function(wish, id) {
    const newlist = wish;
    for(var i=0;i<newlist.items.length;i++){
        if(newlist.items[i].item == id){
            newlist.items.splice(i,1);
            break;
        }
    }
    return newlist.save();
}