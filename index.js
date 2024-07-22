const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");


const app = express();
const PORT = 8005;

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() =>{
    console.log("MongoDB Connected!");
});

app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

app.get("/",(req, res)=>{
    return res.render("home");
});

app.use("/user",userRoutes);

app.listen(PORT, ()=>{
    console.log("Server Started at PORT: ", PORT);
});