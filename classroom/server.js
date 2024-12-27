    const express = require("express");
    const app = express();
    const posts = require("./routes/posts.js");
    const users = require("./routes/users.js");
    const session = require("express-session");
    const flash=require("connect-flash");
    const path=require("path");


    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));

    const sessionOptions={
        secret: "KeyboardCat", 
        resave: false, 
        saveUninitialized: true,        
    }

    app.use(session(sessionOptions));
    app.use(flash());
    app.use((req,res,next)=>{
        res.locals.errorMsg=req.flash("error");
        res.locals.successMsg=req.flash("success");
        next();
    })

    
    app.get("/register",(req,res)=>{
        let {name="Anonymous"}=req.query;
        req.session.name=name;

        if(name==="Anonymous"){
            req.flash("error","user not registered successfully");
        }else{
            req.flash("success","user registered successfully");
        }
        res.redirect("/hello");
    })
    
    
    
    app.get("/hello", (req, res) => {
        res.render("page.ejs",{name:req.session.name});        
    })
    
    // const cookieParser=require("cookie-parser");
    
    // app.use(cookieParser("Secret"));


    // app.use("/posts",posts);
    // app.use("/users",users);


    // app.get("/",(req,res)=>{
    //     let {name}=req.signedCookies;
    //     res.send(`hi ${name}`);

    // })
    // app.get("/getcookies",(req,res)=>{
    //     res.cookie("name","vansh", {signed:true});
    //     res.cookie("country","India");
    //     res.send("i sent you some cookies!");
    // })

    app.listen(3000, () => {
        console.log("listening on port 3000");
    })


