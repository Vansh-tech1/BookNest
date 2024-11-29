const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");


const validateReview = (req, res, next) => {
    const validationResult = reviewSchema.validate(req.body);
    if (validationResult.error) {
        const errmsg = validationResult.error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

//reviews

//post review Route

router.post("/",validateReview,wrapAsync(async(req,res,next)=>{
    let listing= await Listing.findById(req.params.id);
    const newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}))

//delete review route

router.delete("/:reviewId",wrapAsync(async(req,res,next)=>{
    let{id,reviewId}=(req.params);
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))

module.exports=router;