var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{type: String},
    password:{type: String},
    category:{type: String},
    firstname:{type:String, default:null},
    lastname:{type:String, default:null},
    email:{type:String, default:null},
    phone:{type:String, default:null},
    address:[{
        name:{type:String, default:null},
        line:{type:String, default:null},
        city:{type:String, default:null},
        state:{type:String, default:null},
        country:{type:String, default:null},
        postal:{type:String, default:null}
    }],
    orders: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'OrderItem'
    }],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

