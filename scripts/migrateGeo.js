const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Listing = require("../models/listing"); // ✅ apna listing model path check karo

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust"; // ✅ apna DB naam daalo

async function migrateGeo() {
    await mongoose.connect(MONGO_URL);
    console.log("DB connected");

    const listings = await Listing.find({
        $or: [
            { geometry: { $exists: false } },
            { geometry: null },
            { "geometry.coordinates": { $exists: false } },
            { "geometry.coordinates": { $size: 0 } }
        ]
    });
    console.log(`${listings.length} listings need update`);

    for (let listing of listings) {
        try {
            const geoRes = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(listing.location + "," + listing.country)}&format=json&limit=1`,
                { headers: { "User-Agent": "WanderLust/1.0", "Accept-Language": "en" } }
            );
            const geoData = await geoRes.json();

            if (geoData && geoData.length > 0) {
                listing.geometry = {
                    type: "Point",
                    coordinates: [parseFloat(geoData[0].lon), parseFloat(geoData[0].lat)],
                };
                await listing.save();
                console.log(`✅ ${listing.title} → ${listing.location}`);
            } else {
                console.log(`❌ Location nahi mila: ${listing.title}`);
            }

            await new Promise(r => setTimeout(r, 1100)); // rate limit wait
        } catch (err) {
            console.error(`Error:`, err.message);
        }
    }

    console.log("✅ Migration complete!");
    await mongoose.disconnect();
}

migrateGeo();