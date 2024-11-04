const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");


const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);  // Added missing semicolon
});

async function main() {
    await mongoose.connect(mongo_url);
}

const initDb=async ()=>{
   await Listing.deleteMany({});
    Listing.insertMany(initdata.data);
}

initDb();