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

module.exports = router;