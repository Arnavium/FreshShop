var express = require("express");
var router = express.Router();
var passport = require("passport");
const middlewares = require("../middlewares/auth");
var User = require("../models/user");

router.get("/register",middlewares.isLogged,function(req, res){
    res.render('register');
})

router.post("/register", function(req, res){
    var category = req.body.category;
    if(category == "User"){
        User.register(new User({username:req.body.username, category:category}),req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register');
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/home");
            }); 
        });
    }else if(category == "Seller"){
        User.register(new User({username:req.body.username, category:category}),req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('register');
            } 
            passport.authenticate("local")(req, res, function(){
                res.redirect("/home");
            }); 
        });
    }
});

router.post("/login", passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/register"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
});

module.exports = router;
