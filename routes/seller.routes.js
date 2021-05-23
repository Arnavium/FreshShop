var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
var productcontroller = require("../controllers/product");
var categorycontroller = require("../controllers/category");
var usercontroller = require("../controllers/user");
var orderitemcontroller = require("../controllers/orderitem")

router.get("/addproduct",middlewares.isLoggedIn, function(req,res){
    let filter={};
    categorycontroller.getall(filter).then((categories)=>{
        res.render("addproduct", {categories: categories});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.get("/dashboard",middlewares.isLoggedIn, function(req,res){
    res.render("sellerprofile",{seller:req.user})
})

router.post("/dashboard",middlewares.isLoggedIn, function(req,res){
    usercontroller.updateuser(req.body.seller, req.user._id).then(()=>{
        res.redirect('/seller/dashboard')
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.post("/addproduct",middlewares.isLoggedIn, function(req,res){
        var name = req.body.name,
            imageURL1 = req.body.imageURL1,
            imageURL2 = req.body.imageURL2,
            imageURL3 = req.body.imageURL3,
            imageURL = [imageURL1, imageURL2, imageURL3],
            price = req.body.price,
            description = req.body.description,
            category = req.body.category,
            type = req.body.type,
            seller = req.user._id
        var newproduct = {name, imageURL, price, description, category, type, seller}

        productcontroller.add(newproduct).then((product)=>{   
            res.redirect("/seller/products");
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
});

router.get("/addcategory",middlewares.isLoggedIn, function(req, res){
    res.render('addcategory');
})

router.post("/addcategory",middlewares.isLoggedIn, function(req, res){
    categorycontroller.addnew(req.body.category).then(()=>{
        res.redirect('/seller/categories')
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/products",middlewares.isLoggedIn, function(req,res){
    let filter = {seller: req.user._id };
    productcontroller.getAll(filter).then((products)=>{
        if(products.length > 0)
            res.render("inventory",{products: products});
        else
            res.render("inventory",{products: []});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.get("/products/:product_id/update",middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.params.product_id };
    productcontroller.getOne(filter).then((product)=>{
        let cfilter = {};
        categorycontroller.getall(cfilter).then((categories)=>{
            res.render("updateproduct",{product:product, categories:categories});
        }).catch((err)=>{
            console.log(err);
            res.redirect("back")
        })
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.get("/categories",middlewares.isLoggedIn, function(req,res){
    let filter = {};
    categorycontroller.getall(filter).then((categories)=>{
            res.render("managecategory",{categories: categories});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.get("/categories/:category_id/update",middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.params.category_id };
    categorycontroller.getOne(filter).then((category)=>{
        res.render("updatecategory",{category: category});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/categories/:category_id",middlewares.isLoggedIn, function(req,res){
    var id = req.params.category_id;
    categorycontroller.updatecategory(id, req.body.category).then(()=>{
        res.redirect('/seller/categories');
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/products/:product_id",middlewares.isLoggedIn, function(req,res){
    var id = req.params.product_id;
    productcontroller.updateproduct(id, req.body.product).then(()=>{
        res.redirect('/seller/products');
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});
router.delete("/categories/:category_id",middlewares.isLoggedIn,function(req,res){
    var id = req.params.category_id;
    categorycontroller.deletecategory(id).then(()=>{
        res.redirect("/seller/categories");
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.delete("/products/:product_id",middlewares.isLoggedIn,function(req,res){
    var id = req.params.product_id;
    productcontroller.deleteproduct(id).then(()=>{
        res.redirect("/seller/products");
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
})

router.get("/orders",middlewares.isLoggedIn, function(req,res){
    let filter = {};
    orderitemcontroller.getAll(filter, req.user._id).then((sellerorders)=>{
        res.render("sellerdash",{orders:sellerorders});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.get("/orders/:order_id",middlewares.isLoggedIn, function(req,res){
    let filter = {_id:req.params.order_id};
    orderitemcontroller.getOne(filter).then((order)=>{
        res.render("orderdetails",{order:order});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/orders/:order_id",middlewares.isLoggedIn, function(req,res){
    let status = req.body.status;
    let filter = {_id: req.params.order_id};
    orderitemcontroller.getOne(filter).then((order)=>{
        orderitemcontroller.updatestatus(order, status).then(()=>{
            res.redirect("/seller/orders");
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