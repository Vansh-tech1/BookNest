const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");



router.get("/",wrapAsync(async (req,res)=>{
        const category = req.query.category;
        console.log(category);
        try{
            const filteredListing=await Listing.find({genre:category});
            if (filteredListing.length > 0) {
                // Render the filter results if listings are found
                res.render("listings/filter.ejs", { filteredListing });
            } else {
                // Render the filter page with no results
                res.render("listings/filter.ejs");
            } 
        }catch(err) {
            // Handle any potential errors
            console.error(err);
            req.flash("error", "An error occurred while searching.");
            res.redirect("/");
        }
})
)
module.exports=router;