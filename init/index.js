require('dotenv').config()

const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL;
console.log(dbUrl);

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);  // Added missing semicolon
});

async function main() {
    await mongoose.connect(dbUrl);
}

const initDb=async ()=>{
   await Listing.deleteMany({});
   initdata.data= initdata.data.map((obj)=>({
    ...obj,
    owner:"677a30350b2c230769cbed3c"
   }))
    Listing.insertMany(initdata.data);
    console.log("data Initialized");
}

initDb();