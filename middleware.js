let Listing=require("./models/listing");
let Review=require("./models/review.js");
const {listingSchema,reviewSchema}=require("./schema.js");

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Your must be loged in to create Listing");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async (req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You Must be Owner to use this!!")
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    const validationResult = listingSchema.validate(req.body);
    if (validationResult.error) {
        const errmsg = validationResult.error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    const validationResult = reviewSchema.validate(req.body);
    if (validationResult.error) {
        const errmsg = validationResult.error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

module.exports.isReviewAuthor= async (req,res,next)=>{
    let{reviewId,id}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You Must be Owner to use this!!")
        return res.redirect(`/listings/${id}`);
    }
    next();
}