var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
var cartcontroller = require("../controllers/cart")
var orderitemcontroller = require("../controllers/orderitem")
var usercontroller = require("../controllers/user")

router.get("/orders", middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.user._id };
    usercontroller.getOne(filter).then((user)=>{
        res.render("order", {orders: user.orders});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/checkout", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    cartcontroller.getOne(filter).then((cart)=>{
        orderitemcontroller.add(req.user._id, cart).then(()=>{
            cartcontroller.reset(cart).then(()=>{
                res.redirect("/orders");
            })
        }).catch((err)=>{
            res.redirect("/add/address")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/buyagain/:order_id", middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.params.order_id };
    orderitemcontroller.getOne(filter).then((order)=>{
        orderitemcontroller.buyagain(req.user._id, order.items).then(()=>{
                res.redirect("/orders");
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/cancel/:order_id", middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.params.order_id };
    orderitemcontroller.getOne(filter).then((order)=>{
        orderitemcontroller.cancel(order).then(()=>{
                res.redirect("/orders");
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/return/:order_id", middlewares.isLoggedIn, function(req,res){
    let filter={_id: req.params.order_id };
    orderitemcontroller.getOne(filter).then((order)=>{
        orderitemcontroller.return(order).then(()=>{
                res.redirect("/orders");
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});


module.exports = router;