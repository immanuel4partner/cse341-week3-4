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
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: true,
  }),
  (req, res) => {
    // store user in session
    req.session.user = req.user;
    res.redirect("/");
  }
);

/* =========================
   LOGOUT (FIXED PROPERLY)
========================= */
router.get("/logout", (req, res, next) => {
  if (!req.session.user) {
    return res.status(200).send("Already logged out");
  }

  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");

      return res.status(200).send("Successfully logged out");
    });
  });
});

module.exports = router;