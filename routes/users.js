const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const users = require("../controllers/users");
const passport = require("passport");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.register));

router.get("/login", users.renderLogin);

router.post("/login", passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
}), users.login
);

// The below code is only for version 5 passport it throws error in above v-5 passport
router.get("/logout", users.logout);
//  The below code is for new verson 6 of passport but after using this
//    the logout is not working after adding returnTo behavior

// router.get("/logout", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     req.flash("success", "Goodbye!");
//     res.redirect("/campgrounds");
//   });
// });

module.exports = router;
