const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   DEBUG 
========================= */
console.log("CLIENT ID:", process.env.GITHUB_CLIENT_ID ? "OK" : "MISSING");
console.log("CLIENT SECRET:", process.env.GITHUB_CLIENT_SECRET ? "OK" : "MISSING");
console.log("CALLBACK:", process.env.GITHUB_CALLBACK_URL);

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   SESSION CONFIG
========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

/* =========================
   PASSPORT SETUP
========================= */
app.use(passport.initialize());
app.use(passport.session());

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
   ROUTES
========================= */

// Auth routes (login/logout/callback)
app.use("/", require("./routes/index"));

// API routes
app.use("/participants", require("./routes/participants"));
app.use("/sessions", require("./routes/sessions"));

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