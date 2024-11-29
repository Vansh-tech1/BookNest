const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const { error } = require("console");
const listings=require("./routes/listings.js");
const reviews=require("./routes/reviews.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//accessing routers
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);  // Added missing semicolon
});

async function main() {
    await mongoose.connect(mongo_url);
}

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
})


app.use((err,req,res,next)=>{
    let{status=500,message="some error occured"}=err;
    res.status(status).render("listings/error.ejs",{message});
    // res.status(status).send(message);
    console.log(message);
    
})

app.listen(8080, () => {
    console.log("app is listening on port 8080");
});
