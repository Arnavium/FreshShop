var middlewares = {};

middlewares.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/register");
}

middlewares.isLogged = function(req, res, next){
    if(req.isAuthenticated()){
        res.redirect("/home");
    }
    return next();
}

module.exports = middlewares;