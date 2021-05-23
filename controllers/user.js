var User = require("../models/user");

exports.getOne = function(filter) {
    return User.findOne(filter).populate("orders").exec();
}

exports.updateuser = function(user, id){
    return User.findByIdAndUpdate(id, user).exec();
}

exports.getaddress = async function(id, address_id) {
    var filter = {_id:id};
    var address;
    const user = await User.findOne(filter);
    for(var i=0;i<user.address.length;i++){
        if(address_id == user.address[i]._id){
            address = user.address[i]
            break;
        }
    }
    return address;
}

exports.addaddress = async function(address, id) {
    var filter = {_id:id};
    const user = await User.findOne(filter);
    user.address.push(address);
    return await user.save();
}

exports.updateaddress = async function(id, address_id, address) {
    var filter = {_id:id};
    const user = await User.findOne(filter);
    for(var i=0;i<user.address.length;i++){
        if(address_id == user.address[i]._id){
            user.address[i] = address;
            break;
        }
    }
    return await user.save();
}

exports.deladdress = async function(id, addressid) {
    var filter = {_id:id};
    const user = await User.findOne(filter);
    for(var i=0;i<user.address.length;i++){
        if(addressid == user.address[i]._id){
            user.address.splice(i,1);
            break;
        }
    }
    return await user.save();
}