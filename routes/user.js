const express = require("express");
const USER = require("../models/user");



const router = express.Router();

router.get("/signin",(req, res)=>{
    return res.render("signin");
});

router.get("/signup",(req, res)=>{
    return res.render("signup");
});

router.post("/signup",async (req, res)=>{
    const {fullName , email, password} = req.body;

    await USER.create({
        fullName,
        email,
        password
    });

    return res.redirect("/");
});

router.post("/signin",async (req, res)=>{
    const { email, password} = req.body;

    try{
        const token = await USER.matchPasswordAndGenerateToken(email,password);
        return res.cookie("token",token).redirect("/");
    }
    catch(err){
        return res.render("signin",{
                error:"Invalid Email or Password"
        });
    }
    
});

router.get("/logout",(req , res)=>{
    res.clearCookie("token").redirect("/");
});

module.exports = router;