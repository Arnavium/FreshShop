var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
var cartcontroller = require("../controllers/cart")
var productcontroller = require("../controllers/product")

router.get("/cart", middlewares.isLoggedIn, function(req, res){
    var owner = req.user._id;
    var filter = {owner: owner};
    cartcontroller.getOne(filter).then((cart)=>{
        res.render("cart",{cart:cart});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/add/:product_id", middlewares.isLoggedIn, function(req, res){
    var item = req.params.product_id;
    var owner = req.user._id;
    var filter = {owner: owner};
    var pfilter = {_id:item};
    cartcontroller.getOne(filter).then((cart)=>{
        productcontroller.getOne(pfilter).then((product)=>{
            if(cart != null){
                cartcontroller.additem(item, product.price, owner, product.imageURL[0], product.name, product.seller).then((ownercart)=>{
                    res.redirect("/cart");
                }).catch((err)=>{
                    console.log(err);
                    res.redirect("back")
                })
            }else{
                var totalPrice = product.price;
                var quantity = 1;
                var price = product.price;
                var image = product.imageURL[0];
                var itemname = product.name;
                var seller = product.seller;
                var newitem = {item, quantity, price, image, itemname, seller}
                var items = [];
                items.push(newitem);
                var newcart = {owner, totalPrice, items}
                cartcontroller.add(newcart).then(()=>{
                    res.redirect("/cart");
                }).catch((err)=>{
                    console.log(err);
                    res.redirect("back")
                })
            }
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/plus/:product_id",middlewares.isLoggedIn, function(req, res){
    var id = req.params.product_id;
    var owner = req.user._id;
    var filter = {owner: owner};
    cartcontroller.getOne(filter).then((cart)=>{
        cartcontroller.plus(cart, id).then(()=>{
            res.redirect("/cart");
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/minus/:product_id",middlewares.isLoggedIn, function(req, res){
    var id = req.params.product_id;
    var owner = req.user._id;
    var filter = {owner: owner};
    cartcontroller.getOne(filter).then((cart)=>{
        cartcontroller.minus(cart, id).then(()=>{
            res.redirect("/cart");
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/remove/:product_id",middlewares.isLoggedIn, function(req, res){
    var id = req.params.product_id;
    var owner = req.user._id;
    var filter = {owner: owner};
    cartcontroller.getOne(filter).then((cart)=>{
        cartcontroller.del(cart, id).then(()=>{
            res.redirect("/cart");
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

module.exports = router;