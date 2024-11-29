const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");

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


//listing route
router.get("/",wrapAsync( async (req,res)=>{
    const allListings= await Listing.find();
    res.render("listings/index.ejs",{allListings});
}))


//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
router.get("/:id", wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id).populate("reviews");
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
}))

//create route//

router.post("/",validateListing, wrapAsync(async(req,res,next)=>{ 
    const newListing=new Listing(req.body.listing);       
    // console.log(newListing);
    await newListing.save();
    console.log(newListing);    
    res.redirect("/listings"); 
}))




//edit route//

router.get("/:id/edit",wrapAsync( async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
    // console.log(listing);
}))

//update route

router.put("/:id", validateListing, wrapAsync( async (req, res) => {
    const { id } = req.params;
    // const {image:newurl}=req.body.listing;
    const updatedListing =(req.body.listing);
    // await Listing.findByIdAndUpdate(id, {image:newurl});
    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
}));




//Delete Route

router.delete("/:id", wrapAsync(async (req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

module.exports=router;