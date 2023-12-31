const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "HRMS",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: process.env.URL,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        in: "header",
        name: "Authorization",
        description: `Enter the Bearer token`,
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: [
    path.join(__dirname, "../routes/*.js"),
    path.join(__dirname, "../models/*.js"),
  ],
};
const swaggerUiAssetPath = require("swagger-ui-dist").getAbsoluteFSPath();
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

const swaggerDocs = (app, port) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  // app.use("/api/swagger", express.static(swaggerUiAssetPath));
  app.use(
    "/api/swagger",
    express.static(path.join(__dirname, "../swagger-ui-dist"))
  );
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });
};
module.exports = { swaggerDocs };
