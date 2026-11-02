const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })
// midddel wares
const {  validateListing, isLoggedIn, isOwner } = require("../middleware.js");
// controllers
const listingControllers  = require("../controllers/listing.js");

router.route("/")
    .get(wrapAsync( listingControllers.index ))
    .post(isLoggedIn, validateListing, upload.single('listing[image][url]'), wrapAsync( listingControllers.createListing ))

    // New Route
router.get("/new", 
    isLoggedIn, 
    ( listingControllers.newForm )); 

router.route("/:id")
    .get(wrapAsync ( listingControllers.showListing ))
    .put(
        isLoggedIn,
        isOwner,
        validateListing, 
        upload.single('listing[image][url]'), 
        wrapAsync( listingControllers.updateListing))

    .delete(isLoggedIn,
        isOwner, 
        wrapAsync( listingControllers.deleteListing ))


// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync( listingControllers.editListing ))


module.exports = router;