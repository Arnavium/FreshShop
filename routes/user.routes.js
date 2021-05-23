var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
var wishlistcontroller = require("../controllers/wishlist");
var productcontroller = require("../controllers/product");
var usercontroller = require("../controllers/user");

router.get("/profile", middlewares.isLoggedIn, function(req, res){
    res.render('profile');
})

router.get("/login&security", middlewares.isLoggedIn, function(req, res){
    var user = req.user;
    res.render('login&security',{user:user});
})

router.post("/profile/update", middlewares.isLoggedIn, function(req, res){
    var id = req.user._id;
    usercontroller.updateuser(req.body.user, id).then(()=>{
        res.redirect('/login&security');
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/address", middlewares.isLoggedIn, function(req, res){
    var user = req.user;
    res.render('addresses',{user:user});
})

router.get("/add/address", middlewares.isLoggedIn, function(req, res){
    var user = req.user;
    res.render('addaddress',{user:user});
})

router.post("/add/address", middlewares.isLoggedIn, function(req, res){
    var id = req.user._id;
    usercontroller.addaddress(req.body.address, id).then(()=>{
        res.redirect('/address');
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/edit/:address_id", middlewares.isLoggedIn, function(req, res){
    var user = req.user;
    var id = req.user._id;
    var address_id = req.params.address_id
    usercontroller.getaddress(id, address_id).then((address)=>{
        res.render('editaddress',{address:address, user:user});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/edit/:address_id", middlewares.isLoggedIn, function(req, res){
    var id = req.user._id;
    var address_id = req.params.address_id;
    usercontroller.updateaddress(id, address_id, req.body.address).then(()=>{
        res.redirect('/address');
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/remove/address/:address_id", middlewares.isLoggedIn, function(req, res){
    var id = req.user._id;
    var address_id = req.params.address_id
    usercontroller.deladdress(id, address_id).then(()=>{
        res.redirect('/address');
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/wishlist", middlewares.isLoggedIn, function(req, res){
    var owner = req.user._id;
    var filter = {owner: owner};
    wishlistcontroller.getOne(filter).then((wish)=>{
        res.render("wishlist",{wish:wish});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/wish/:product_id", middlewares.isLoggedIn, function(req, res){
    var item = req.params.product_id;
    var owner = req.user._id;
    var filter = {owner: owner};
    var pfilter = {_id:item};
    wishlistcontroller.getOne(filter).then((list)=>{
        productcontroller.getOne(pfilter).then((product)=>{
            if(list != null){
                wishlistcontroller.additem(item, product.price, owner, product.imageURL[0], product.name).then(()=>{
                    res.redirect("/wishlist");
                }).catch((err)=>{
                    console.log(err);
                    res.redirect("back")
                })
            }else{
                var price = product.price;
                var image = product.imageURL[0];
                var itemname = product.name;
                var newitem = {item, price, image, itemname}
                var items = [];
                items.push(newitem);
                var newlist = {owner, items}
                wishlistcontroller.add(newlist).then(()=>{
                    res.redirect("/wishlist");
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

router.post("/wishremove/:product_id", middlewares.isLoggedIn, function(req, res){
    var id = req.params.product_id;
    var owner = req.user._id;
    var filter = {owner: owner};
    wishlistcontroller.getOne(filter).then((wish)=>{
        wishlistcontroller.del(wish, id).then(()=>{
            res.redirect("/wishlist");
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

module.exports = router;