const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

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
app.get("/listings", async (req,res)=>{
    const allListings= await Listing.find();
    res.render("listings/index.ejs",{allListings});
})

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id);
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
})

//create route

app.post("/listings", async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    console.log(newListing);
    // console.log(newListing);
    await newListing.save();
    res.redirect("/listings");
})

//edit route

app.get("/listings/:id/edit", async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
    // console.log(listing);
})

//update route

app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const {url:newurl}=req.body.listing;
    const updatedListing =(req.body.listing);
    await Listing.findByIdAndUpdate(id, {image:{url:newurl}});
    await Listing.findByIdAndUpdate(id, updatedListing);
    res.redirect(`/listings/${id}`);
});


//Delete Route

app.delete("/listings/:id",async (req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})



app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.listen(8080, () => {
    console.log("app is listening on port 8080");
});
