const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

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