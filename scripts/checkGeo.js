// scripts/checkGeo.js
const mongoose = require("mongoose");
const Listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust"; // apna DB URL

async function check() {
    await mongoose.connect(MONGO_URL);
    const listing = await Listing.findOne({});
    console.log(JSON.stringify(listing, null, 2));
    await mongoose.disconnect();
}

check();