const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");


//listing route
router.get("/",wrapAsync( async (req,res)=>{
    const allListings= await Listing.find();
    res.render("listings/index.ejs",{allListings});
}))


//new route
router.get("/new",
    isLoggedin,
    (req,res)=>{ 
    res.render("listings/new.ejs");
})

//show route
router.get("/:id", wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id)
    .populate("reviews")
    .populate("owner");
    // console.log(listing);
    if(!listing){
        req.flash("error","Listing Does Not Exist!!");
        res.redirect("/listings");
    }
    
    res.render("listings/show.ejs",{listing});
}))

//create route//

router.post("/",
    isLoggedin,
    validateListing,     
    wrapAsync(async(req,res,next)=>{ 
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id;       
    // console.log(newListing);
    await newListing.save();
    console.log(newListing);
    req.flash("success","New Listing Created!");    
    res.redirect("/listings"); 
}))




//edit route//

router.get("/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync( async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does Not Exist!!");
        res.redirect("/listings")
    }
    
    res.render("listings/edit.ejs",{listing});
    // console.log(listing);
}))

//update route

router.put("/:id",
    isLoggedin,
    isOwner,  
    validateListing,
    wrapAsync( async (req, res) => {
    const { id } = req.params;
    
    const updatedListing =(req.body.listing);

    let listing=await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, updatedListing);
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}));




//Delete Route

router.delete("/:id",
    isLoggedin,
    isOwner, 
    wrapAsync(async (req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}))

module.exports=router;