const express = require("express");
const router = express.Router();
const passport = require("passport");

/* =========================
   LOGIN
   /auth/login
========================= */
router.get(
  "/login",
  passport.authenticate("github", { scope: ["user:email"] })
);

/* =========================
   CALLBACK
   /auth/github/callback
========================= */
router.get(
  "/github/callback",
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
   /auth/logout
========================= */
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  });
});

module.exports = router;