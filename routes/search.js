const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");



router.get("/",wrapAsync(async (req,res)=>{
    try {
        const searchListings = await Listing.find({ location: req.query.q });

        if (searchListings.length > 0) {
            // Render the search results if listings are found
            res.render("listings/search.ejs", { searchListings });
        } else {
            // Render the search page with no results
            res.render("listings/search.ejs");
        }
    } catch (err) {
        // Handle any potential errors
        console.error(err);
        req.flash("error", "An error occurred while searching.");
        res.redirect("/");
    }
})
)
module.exports=router;