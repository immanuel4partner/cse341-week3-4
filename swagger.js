const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Participants & Sessions API",
      version: "1.0.0",
      description: "Simple REST API for Managing Participants and Sessions",
    },
  },

  apis: ["./server.js", "./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;