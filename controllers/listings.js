const Listing=require("../models/listing");

//index route
module.exports.index=  async (req,res)=>{
    const allListings= await Listing.find();
    res.render("listings/index.ejs",{allListings});
}

//new route
module.exports.renderNewForm=(req,res)=>{ 
    res.render("listings/new.ejs");
}

//show route
module.exports.showListing=async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    // console.log(listing);
    if(!listing){
        req.flash("error","Listing Does Not Exist!!");
        res.redirect("/listings");
    }
    
    res.render("listings/show.ejs",{listing});
}

//create route
module.exports.createListing=async(req,res,next)=>{ 
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,filename);
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id; 
    newListing.image={url,filename};      
    await newListing.save();
    console.log(newListing);
    req.flash("success","New Listing Created!");    
    res.redirect("/listings"); 
}

//edit route
module.exports.renderEditForm= async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing Does Not Exist!!");
        res.redirect("/listings")
    }

    let originalImageUrl=listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/h_150,w_200");    
    res.render("listings/edit.ejs",{listing,originalImageUrl});
    // console.log(listing);
}

//update route
module.exports.updateListing=async (req, res) => {
    const { id } = req.params;
    const updatedListing =(req.body.listing);
    let listing= await Listing.findByIdAndUpdate(id, updatedListing);
    if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}


//delete route
module.exports.deleteListing=async (req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}



