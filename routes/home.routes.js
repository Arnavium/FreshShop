var express = require("express");
var router = express.Router();
var productcontroller = require("../controllers/product")
var categorycontroller = require("../controllers/category");
var usercontroller = require("../controllers/user");

router.get("/", function(req, res){
    res.redirect("/home");
})

router.get("/home", function(req, res){
    let filter={};
    productcontroller.getAll(filter).then((products)=>{
        categorycontroller.getall(filter).then((categories)=>{
            if(req.user != null){
                if(req.user.category == "User"){
                    res.render('home',{products:products, categories:categories});
                }else{
                    res.redirect('/seller/dashboard');
                }
            }else{
                res.render('home',{products:products, categories:categories});
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

router.get("/category/:category_id", function(req, res){
    let cfilter={_id:req.params.category_id};
    categorycontroller.getOne(cfilter).then((category)=>{
        let filter={category:category.name};
        productcontroller.getAll(filter).then((products)=>{
            res.render('category',{products:products, category:category});
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/view/:product_id", function(req, res){
    let filter={_id:req.params.product_id};
    productcontroller.getOne(filter).then((product)=>{
        let sfilter = {_id : product.seller};
        usercontroller.getOne(sfilter).then((seller)=>{
            res.render('showproduct',{fproduct:product, seller:seller, user:req.user});
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/contactus", function(req, res){
    res.render("contactus");
})

router.get("/aboutus", function(req, res){
    res.render("aboutus");
})

module.exports = router;