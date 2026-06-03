const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const swaggerSpec = require("./swagger");
const connectDB = require("./config/db");

const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

dotenv.config();

const app = express();

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
   GITHUB OAUTH STRATEGY
========================= */
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

/* =========================
   AUTH ROUTES
========================= */
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.send(`Logged in as ${req.session.user.displayName}`);
  }
  res.send("Logged out");
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

/* =========================
   DATABASE
========================= */
connectDB();

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