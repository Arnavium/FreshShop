var Orderitem = require("../models/orderitem");
const User = require("../models/user");

exports.getAll = async function(filter, seller_id) {
    var orders = await Orderitem.find(filter).exec();
    var sellerorders = [];
    orders.forEach(function(order){
        if(order.items.seller == seller_id.toString()){
            sellerorders.push(order);
        }
    })
    return sellerorders.reverse();
}

exports.getOne = function(filter) {
    return Orderitem.findOne(filter).exec();
}

exports.add = async function(id, cart) {
    const user = await User.findById(id);
    var newOrder;

    cart.items.forEach(function(item){
        var totalPrice = item.price * item.quantity;
        var items = item;
        var payment = "Cash On Delivery";
        var status = "Waiting for confirmation";
        var tempOrderDate = new Date();
        var orderDate = tempOrderDate.toLocaleDateString();
        var tempdeliveryDate = new Date(tempOrderDate.getTime() + 172800000);
        var deliveryDate = tempdeliveryDate.toLocaleDateString();
        var tempreturnDate = new Date(tempdeliveryDate.getTime() + 604800000);
        var returnDate = tempreturnDate.toLocaleDateString();
        var msg = null;
        var line = user.address[0].line,
            city = user.address[0].city,
            state = user.address[0].state,
            country = user.address[0].country,
            postal = user.address[0].postal,
            name = user.address[0].name,
            email = user.email,
            phone = user.phone,
            address = {name, line, city, state, country, postal, email, phone},
            order = {totalPrice, items, payment, status, orderDate, deliveryDate, returnDate, msg, address};
        newOrder = new Orderitem(order);
        newOrder.save();
        user.orders.push(newOrder);
    })
    return await user.save();
}

exports.buyagain = async function(id, item) {
    const user = await User.findById(id);
    var newOrder;
    
    var totalPrice = item.price * item.quantity;
    var items = item;
    var payment = "Cash On Delivery";
    var status = "Waiting for confirmation";
    var tempOrderDate = new Date();
    var orderDate = tempOrderDate.toLocaleDateString();
    var tempdeliveryDate = new Date(tempOrderDate.getTime() + 172800000);
    var deliveryDate = tempdeliveryDate.toLocaleDateString();
    var tempreturnDate = new Date(tempdeliveryDate.getTime() + 604800000);
    var returnDate = tempreturnDate.toLocaleDateString();
    var msg = null;
    var line = user.address[0].line,
        city = user.address[0].city,
        state = user.address[0].state,
        country = user.address[0].country,
        postal = user.address[0].postal,
        name = user.address[0].name,
        email = user.email,
        phone = user.phone,
        address = {name, line, city, state, country, postal, email, phone},
        order = {totalPrice, items, payment, status, orderDate, deliveryDate, returnDate, msg, address};
    newOrder = new Orderitem(order);
    newOrder.save();
    user.orders.push(newOrder);
    return await user.save();
}

exports.cancel = async function(order) {
    console.log(order)
    const newOrder = order;
    newOrder.status = "Cancelled";
    newOrder.deliveryDate = new Date().toLocaleDateString();
    newOrder.returnDate = "";
    return await newOrder.save();
}

exports.return = async function(order) {
    const newOrder = order;
    newOrder.status = "Returned";
    newOrder.deliveryDate = new Date().toLocaleDateString();
    newOrder.returnDate = "";
    return await newOrder.save();
}

exports.updatestatus = async function(order, status) {
    const neworder = order;
    if(status == "Delivered"){
        neworder.deliveryDate = new Date().toLocaleDateString();
    }
    else if(status == "Cancelled"){
        neworder.deliveryDate = new Date().toLocaleDateString();
        neworder.msg = "Seller couldnot deliver. Sorry for inconvenience";
    }
    neworder.status = status;
    return await neworder.save();
}