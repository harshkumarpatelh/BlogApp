require('dotenv').config();
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const blogRoute = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");



const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL).then(() =>{
    console.log("MongoDB Connected!");
});

app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/",async (req, res)=>{
    const allBlog = await Blog.find({});
    return res.render("home",{
        user:req.user,
        allBlogs:allBlog,
    });
});

app.use("/user",userRoutes);
app.use("/blog",blogRoute);

app.listen(PORT, ()=>{
    console.log("Server Started at PORT: ", PORT);
});