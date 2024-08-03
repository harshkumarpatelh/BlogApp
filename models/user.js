const mongoose = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const { createTokenForUser } = require("../services/authentication");


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
        default:"D:/Code/Development/Nodejs/BlogApp/public/image/images.png"
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
    
    const salt = randomBytes(16).toString();
    
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();;
});


userSchema.static("matchPasswordAndGenerateToken", async function (email, password){
    const user = await this.findOne({email});

    if(!user)
        throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedPassword = createHmac('sha256',salt)
    .update(password)
    .digest("hex");

    if(hashedPassword !== userProvidedPassword)
        throw new Error("Incorrect Password");


    const token = createTokenForUser(user);

    return token;
       
});

const USER = mongoose.model("user",userSchema);

module.exports = USER;