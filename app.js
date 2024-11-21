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

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);  // Added missing semicolon
});

async function main() {
    await mongoose.connect(mongo_url);
}

//listing route
app.get("/listings",wrapAsync( async (req,res)=>{
    const allListings= await Listing.find();
    res.render("listings/index.ejs",{allListings});
}))


//schema Validation middleware

const validateListing = (req, res, next) => {
    const validationResult = listingSchema.validate(req.body);
    if (validationResult.error) {
        const errmsg = validationResult.error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

const validateReview = (req, res, next) => {
    const validationResult = reviewSchema.validate(req.body);
    if (validationResult.error) {
        const errmsg = validationResult.error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};


//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id", wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id).populate("reviews");
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
}))

//create route//

app.post("/listings",validateListing, wrapAsync(async(req,res,next)=>{ 
    const newListing=new Listing(req.body.listing);       
    // console.log(newListing);
    await newListing.save();
    console.log(newListing);    
    res.redirect("/listings"); 
}))




//edit route//

app.get("/listings/:id/edit",wrapAsync( async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
    // console.log(listing);
}))

//update route

app.put("/listings/:id", validateListing, wrapAsync( async (req, res) => {
    const { id } = req.params;
    // const {image:newurl}=req.body.listing;
    const updatedListing =(req.body.listing);
    // await Listing.findByIdAndUpdate(id, {image:newurl});
    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
}));




//Delete Route

app.delete("/listings/:id", wrapAsync(async (req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

//reviews

//post review Route

app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res,next)=>{
    let listing= await Listing.findById(req.params.id);
    const newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}))

//delete review route

app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res,next)=>{
    let{id,reviewId}=(req.params);
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))

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
