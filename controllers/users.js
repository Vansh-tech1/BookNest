const User=require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signupUser=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser= await User.register(newUser,password); 
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to BookNest");
            res.redirect("/listings");  
        })
            
        
    }catch(e){
        req.flash("error","Username already exists");
        res.redirect("/signup");
    }
     
}

module.exports.renderLoginForm=async(req,res)=>{
    res.render("users/login.ejs");    
}

module.exports.loginUser=
async (req,res)=>{
req.flash("success","Welcome back to BookNest");
let redirectUrl=res.locals.redirectUrl ||"/listings";
res.redirect(redirectUrl);
}

module.exports.logoutUser=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged out successfully!");
        res.redirect("/listings");
    })
}