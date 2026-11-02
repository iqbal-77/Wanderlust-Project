const express = require("express");
const router = express.Router({ mergeParams : true });
// Error handler
const wrapAsync = require("../utils/wrapAsync.js");
// midelware
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
// Controllers
const reviewController = require("../controllers/review.js");
// Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync( reviewController.createReview));
// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync( reviewController.destroyReview ))

module.exports = router;