var express                 = require("express"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user"),
    mongoose                = require("mongoose"),
    bodyParser              = require("body-parser"),
    methodOverride          = require("method-override"),
    homeroutes              = require("./routes/home.routes"),
    authroutes              = require("./routes/auth.routes"),
    userroutes              = require("./routes/user.routes"),
    sellerroutes            = require("./routes/seller.routes"),
    cartroutes              = require("./routes/cart.routes"),
    searchroutes            = require("./routes/search.routes"),
    commentroutes           = require("./routes/comment.routes"),
    orderroutes             = require("./routes/order.routes")


var app = express();
// mongoose.connect("mongodb://localhost:27017/ecommerce",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false});
mongoose.connect("mongodb+srv://Arnav:Arnav2000@cluster0-0eldl.mongodb.net/FreshShop?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify: false});

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static("public"));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret:"No secret",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');

app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(homeroutes);
app.use(authroutes);
app.use(userroutes);
app.use(cartroutes);
app.use("/seller",sellerroutes);
app.use("/search",searchroutes);
app.use("/comments",commentroutes);
app.use(orderroutes)

let port = process.env.PORT||4000;
app.listen(port);