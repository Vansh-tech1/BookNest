const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {validateReview, isLoggedin, isOwner, isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");
const ExpressError=require("../utils/ExpressError.js");

//reviews

//post review Route

router.post("/",
    isLoggedin,
    validateReview,
    wrapAsync(reviewController.createReview))

//delete review route

router.delete("/:reviewId",
    isLoggedin,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview))

module.exports=router;