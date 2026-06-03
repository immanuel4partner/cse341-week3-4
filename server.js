const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");
const connectDB = require("./config/db");

const session = require("express-session");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;

dotenv.config();

const app = express();

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   DEBUG (REMOVE IN PRODUCTION IF YOU WANT)
========================= */
console.log("CLIENT ID:", process.env.GITHUB_CLIENT_ID ? "OK" : "MISSING");
console.log("CLIENT SECRET:", process.env.GITHUB_CLIENT_SECRET ? "OK" : "MISSING");
console.log("CALLBACK:", process.env.GITHUB_CALLBACK_URL);

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* =========================
   GITHUB STRATEGY
========================= */
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

/* =========================
   AUTH ROUTES
========================= */

// LOGIN ROUTE
app.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// CALLBACK ROUTE 
app.get(
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
   HOME ROUTE
========================= */
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.send(`Logged in as ${req.session.user.username}`);
  }
  res.send("Logged out");
});

/* =========================
   ROUTES
========================= */
const participantRoutes = require("./routes/participants");
const sessionRoutes = require("./routes/sessions");

app.use("/participants", participantRoutes);
app.use("/sessions", sessionRoutes);

/* =========================
   SWAGGER
========================= */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});