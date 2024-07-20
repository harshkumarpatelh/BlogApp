const mongoose = require("mongoose");
const {createHmac, randomeBytes} = require("crpto");


const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    salt:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
        default:"../public/image/images.png"
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true});




userSchema.pre("save", function (next){
    const user = this;
    if(!user.isModified("password")) return ;
    
    const salt = randomeBytes(16).toString();
    
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();;
});

const USER = mongoose.model("user",userSchema);

module.exports = USER;