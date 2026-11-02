const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main() 
    .then(()=> console.log("connect DB"))
    .catch(err => console.log(err));



async function main() {
  await mongoose.connect(MONGO_URL);
}

const allData = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner : "6ad680d49f37c87549d7154a" }) );
    await Listing.insertMany(initData.data);
    // let data = await Listing.find({});
    // console.log(data);
}
allData();  