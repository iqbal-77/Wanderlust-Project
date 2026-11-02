const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res)=>{
    res.render("user/signup.ejs");
}

module.exports.userSignup = async(req, res, next)=>{
    try{
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        // After sign up direct log in
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            else{
                req.flash("success", "Welcome to Wanderlust!");
                res.redirect("/listings");
            }
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm =  (req, res)=>{
    res.render("user/login.ejs");
}

module.exports.userLogin = async(req, res)=>{
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash("success", "You are logged out!");
            res.redirect("/listings");
        }
    })
}