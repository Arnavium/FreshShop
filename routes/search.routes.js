var express = require("express");
var router = express.Router();
var productcontroller = require("../controllers/product");

router.get("/",function(req,res){
    var name = req.query.search;
    var sort = req.query.sortby;
    var order = req.query.orderby;
    let filter = {};
    filter = {$or: [{name:{$regex: name, $options: '$i'}}, {category:{$regex: name, $options: '$i'}}]};
    productcontroller.getAll(filter).then((products)=>{
            if(sort == "price" && order == "ASC"){
                products.sort(function(a,b){
                    return a.price - b.price;
                })
                res.render("search", {products: products, name:name, sort:sort, order:order});
            }
            else if(sort == "title" && order == "ASC"){
                products.sort(function(a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase(); 
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  });
                res.render("search", {products: products, name:name, sort:sort, order:order});
            }
            else if(sort == "number" && order == "DESC"){
                products.sort(function(a,b){
                    return b.price - a.price;
                })
                res.render("search", {products: products, name:name, sort:sort, order:order});
            }
            else if(sort == "title" && order == "DESC"){
                products.sort(function(a, b) {
                    var nameA = a.name.toUpperCase();
                    var nameB = b.name.toUpperCase(); 
                    if (nameA > nameB) {
                      return -1;
                    }
                    if (nameA < nameB) {
                      return 1;
                    }
                    return 0;
                  });
                res.render("search", {products: products, name:name, sort:sort, order:order});
            }
            else{
                res.render("search", {products: products, name:name, sort:sort, order:order});
            }
    }).catch((err)=>{
        console.log(err)
        res.redirect("back")
    })
});

module.exports = router;