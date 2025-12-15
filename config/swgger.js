const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Russels API",
      version: "1.0.0",
      description: "API documentation for catways, reservations and users"
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },

  // Définir l’emplacement des annotations JSDoc
  apis: [
    "./routes/*.js",
    "./controllers/*.js",
    "./models/*.js",
    "./services/*.js"
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log("Swagger documentation available at http://localhost:3000/api-docs");
}

module.exports = swaggerDocs;
