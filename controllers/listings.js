const Listing = require("../models/listing");
const fetch = require("node-fetch");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { 
        allListings, 
        mapListings: JSON.stringify(allListings) 
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    const location = req.body.listing.location;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
    const response = await fetch(url, { headers: { "User-Agent": "WanderLust/1.0" } });
    const data = await response.json();

    if (data.length > 0) {
        const { lon, lat } = data[0];
        newListing.geometry = {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)]
        };
    } else {
        newListing.geometry = {
            type: "Point",
            coordinates: [0, 0]
        };
    }

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { 
        listing,
        originalImageUrl: listing.image.url  // ← yeh add karo
    });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true }); // ← 'let' aur {new:true}
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
        await listing.save();
    }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id); // ← findByIdAndDelete
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};



// const Listing = require("../models/listing");
// const amodulexios = require("node-fetch");

// module.exports.index = async(req,res) =>{
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs",{ allListings,mapListings: JSON.stringify(allListings) });
// }

// module.exports.renderNewForm = (req,res) =>{
//     res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req,res) =>{
//     let { id } = req.params;
//     const listing= await Listing.findById(id).populate({
//         path:"reviews",
//         populate: {
//             path:"author",
//         },
//     })
//     .populate("owner");
//     if(!listing){
//         req.flash("error","Listing you requested for does not exist!");
//         return res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", { listing });
// };

// const fetch = require("node-fetch"); // ← naam "fetch" rakho

// module.exports.createListing = async (req, res, next) => {
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;

//     if(req.file) {
//         let url = req.file.path;
//         let filename = req.file.filename;
//         newListing.image = { url, filename };  // ← model ke hisaab se adjust karo
//     }

//     const location = req.body.listing.location;
//     const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`;
    
//     const response = await fetch(url, { 
//         headers: { "User-Agent": "WanderLust/1.0" } 
//     });
//     const data = await response.json(); // ← .json() call karna padta hai

//     if (data.length > 0) {
//         const { lon, lat } = data[0];
//         newListing.geometry = {
//             type: "Point",
//             coordinates: [parseFloat(lon), parseFloat(lat)]
//         };
//     } else {
//         newListing.geometry = {
//             type: "Point",
//             coordinates: [0, 0]
//         };
//     }

//     await newListing.save();
//     req.flash("success", "New Listing Created");
//     res.redirect("/listings");
// };

// module.exports.renderEditForm = async (req,res) =>{
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     if(!listing){
//         req.flash("error","Listing you requested for does not exist!");
//         return res.redirect("/listings");
//     }
//     res.render("listings/edit.ejs",{ listing });

// };

// module.exports.updateListing = async (req,res) =>{
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing });
//     if (req.file) {
//         listing.image = {
//             url: req.file.path,
//             filename: req.file.filename,
//         };
//         await listing.save();
//     }
//     req.flash("success","Listing Updated");

//     res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async (req,res) =>{
//     let { id } = req.params;
//     let deletedListing = await Listing.findOneAndDelete(id);
//     console.log(deletedListing);
//     req.flash("success","Listing Deleted");
//     res.redirect("/listings");
// }