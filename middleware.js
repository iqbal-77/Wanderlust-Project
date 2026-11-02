let Listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema  } = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        // redirectUrl save 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged-in to create listings!");
        return res.redirect("/login");
    }
    next();
}
// This is only run if user is not logged in and try to access pages that require login;
module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req, res, next)=>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!res.locals.currUser._id.equals(listing.owner._id)){
        req.flash("error", "You dont't have permission edit this listing!");
        return res.redirect(`/listings/${ id }`);
    }   
    next();
}

// listing Validate
module.exports.validateListing = (req, res, next)=>{
    let { error } = listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

// Review Validate
module.exports.validateReview = (req, res, next)=>{
    let { error } = reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

module.exports.isReviewAuthor = async(req, res, next)=>{
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if(!res.locals.currUser._id.equals(review.author._id)){
        req.flash("error", "you r not the author of this comment!");
        return res.redirect(`/listings/${ id }`);
    }
    next();
}