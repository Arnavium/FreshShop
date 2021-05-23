var express = require("express");
var router = express.Router();
const middlewares = require("../middlewares/auth");
var productcontroller = require("../controllers/product")
var commentcontroller = require("../controllers/comment")

router.get("/new/:product_id",middlewares.isLoggedIn,function(req,res){
    let pfilter = {_id:req.params.product_id}
    productcontroller.getOne(pfilter).then((product)=>{
        res.render("newcomment",{product:product, user:req.user});
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.post("/new/:product_id",middlewares.isLoggedIn,function(req,res){
    var product_id = req.params.product_id;
    var text = req.body.comment;
    var id = req.user._id;
    var username = req.user.username
    var author = {id, username}
    var date = new Date().toLocaleDateString();
    var comment = {text, author, date};
    commentcontroller.add(product_id, comment).then(()=>{
        res.redirect('/view/'+product_id);
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.get("/edit/:product_id/:comment_id",middlewares.isLoggedIn,function(req,res){
    let filter = {_id: req.params.comment_id};
    commentcontroller.getOne(filter).then((comment)=>{
        res.render('editcomment',{comment: comment, product_id:req.params.product_id, user: req.user})
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.put("/edit/:product_id/:comment_id",middlewares.isLoggedIn,function(req,res){
    var product_id = req.params.product_id;
    var text = req.body.comment;
    var id = req.user._id;
    var username = req.user.username
    var author = {id, username}
    var date = new Date().toLocaleDateString();
    var comment = {text, author, date};
    commentcontroller.updatecomment(req.params.comment_id, comment).then(()=>{
        res.redirect('/view/'+product_id);
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

router.delete("/delete/:product_id/:comment_id",middlewares.isLoggedIn,function(req,res){
    var product_id = req.params.product_id;
    commentcontroller.deletecomment(req.params.comment_id).then(()=>{
        res.redirect('/view/'+product_id);
    }).catch((err)=>{
        console.log(err);
        res.redirect("back")
    })
});

module.exports = router;