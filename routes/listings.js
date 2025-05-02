const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({
    storage,
    limits: { fileSize: 500 * 1024 }
});



const listingController = require("../controllers/listings.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))
router.post(
    "/",
    isLoggedin,
    upload.single("listing[image]"),
    (err, req, res, next) => {
        if (err.code === "LIMIT_FILE_SIZE") {
            req.flash("error", "File size exceeds the 500 KB limit!");
            res.redirect("/listings/new")
        }
        next();
    },
    validateListing,
    wrapAsync(listingController.createListing)
);

router.get("/new",
    isLoggedin,
    listingController.renderNewForm
)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedin,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(
        isLoggedin,
        isOwner,
        wrapAsync(listingController.deleteListing)
    );


//new route


//edit route//
router.get("/:id/edit",
    isLoggedin,
    isOwner,
    wrapAsync(listingController.renderEditForm))

module.exports = function bookNow() {
    res.redirect("listing/:id/edit");
};

module.exports = router;