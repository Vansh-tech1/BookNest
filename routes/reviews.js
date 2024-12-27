const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const {validateReview}=require("../middleware.js");

//reviews

//post review Route

router.post("/",validateReview,wrapAsync(async(req,res,next)=>{
    let listing= await Listing.findById(req.params.id);
    const newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}))

//delete review route

router.delete("/:reviewId",wrapAsync(async(req,res,next)=>{
    let{id,reviewId}=(req.params);
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}))

module.exports=router;