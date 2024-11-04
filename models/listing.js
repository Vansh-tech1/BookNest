const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:{
            type:String,
        },
        url:{
            type:String,
            default:"https://media.istockphoto.com/id/1352664026/photo/3d-rendering-of-modern-house-in-luxurious-style-by-the-sea-or-ocean-in-night.jpg?s=1024x1024&w=is&k=20&c=Knu13hCRdpecSQjxHLJ2ElM13s06J3Ypkx-H4709fhs=",
            set:(v)=> v===" "?
            "https://media.istockphoto.com/id/1352664026/photo/3d-rendering-of-modern-house-in-luxurious-style-by-the-sea-or-ocean-in-night.jpg?s=1024x1024&w=is&k=20&c=Knu13hCRdpecSQjxHLJ2ElM13s06J3Ypkx-H4709fhs="
            : v,
        },  
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;