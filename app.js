if(process.env.NODE_ENV!="production"){
    require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const Review=require("./models/review.js");

const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");

const {listingSchema,reviewSchema}=require("./schema.js");
const { error } = require("console");
const ExpressError=require("./utils/ExpressError.js")

const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");

const listingRouter=require("./routes/listings.js");
const reviewRouter=require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const searchRouter=require("./routes/search.js");
const filterRouter=require("./routes/filters.js");

const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err); 
});

async function main() {
    await mongoose.connect(dbUrl);
}



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store= MongoStore.create({ 
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
})

store.on("Error",(err)=>{
    console.log("error in session store",err);
})


const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

//accessing routers
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use("/search",searchRouter)
app.use("/filter",filterRouter);




app.get("/",(req,res)=>{
    res.redirect("/listings");
})

app.post("/listings/:id/booking", (req, res) => {
    console.log("Booking process initiated for ID:", req.params.id);
    


    // Use setTimeout to delay the redirection
    setTimeout(() => {
        req.flash("error","Booking Service Not started yet!!");
       
        res.redirect("/listings"); // Redirect to the /listings page after 2 seconds
        
       
    }, 1500);
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})




app.use((err,req,res,next)=>{
    let{status=500,message="some error occured"}=err;
    res.status(status).render("listings/error.ejs",{message});
    // res.status(status).send(message);
    console.log(err);    
})



app.listen(8080, () => {
    console.log("app is listening on port 8080");
});
