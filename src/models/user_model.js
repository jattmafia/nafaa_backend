const{Schema,model} = require('mongoose');


const userSchema = new Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password : {type:String,required:true},
    phone:{type:Number,required:true},
    address: {type:String,required:true},
});

const userModel = model("user", userSchema);

module.exports = userModel;