const jwt = require("jsonwebtoken");
const secrete = "patel@123";

function createTokenForUser(user){
    const payload = {
        id : user._id,
        fullname:user.fullName,
        email:user.email,
        profileImageUrl :user.profileImage,
        role:user.role
    };

    const token = jwt.sign(payload, secrete);
    return token;
}

function validateToken(token){
    const payload =  jwt.verify(token,secrete);
    return payload;
}

module.exports ={
    createTokenForUser,
    validateToken
}