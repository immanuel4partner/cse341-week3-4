const express = require("express");
const router = express.Router();
const passport = require("passport");

/* =========================
   LOGIN
========================= */
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

/* =========================
   CALLBACK 
========================= */
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

/* =========================
   LOGOUT
========================= */
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.user = null;

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

module.exports = router;