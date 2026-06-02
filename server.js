const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const connectDB = require("./config/db");

const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Z-key, Accept, X-requested-With, Authorization");
  next();
});

app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cors({ origin: "*" }));
app.use("/", require("./routes/index.js"));

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
  // Here you would typically find or create a user in your database
  // For simplicity, we'll just return the GitHub profile
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get("/", (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get("/github/callback", passport.authenticate("github", {
  failureRedirect: "/api-docs", session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect("/");
});

// CONNECT DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json());

// ROUTES
const participantRoutes = require("./routes/participants");
const sessionRoutes = require("./routes/sessions");

app.use("/participants", participantRoutes);
app.use("/sessions", sessionRoutes);

// SWAGGER DOCUMENTATION
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Participant & Session API Running...");
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});