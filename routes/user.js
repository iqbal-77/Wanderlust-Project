const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js")
// Controllers
const userController = require("../controllers/user.js");

router.get("/signup", userController.renderSignupForm)

router.post("/signup", wrapAsync( userController.userSignup ));

router.get("/login", userController.renderLoginForm)

router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect : "/login", failureFlash : true } ), userController.userLogin );
// Log out
router.get("/logout", userController.userLogout)

module.exports = router;