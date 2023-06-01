import SwaggerJs from "swagger-jsdoc";

export const swaggerJs = SwaggerJs({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Fitness app API",
        version: "1.0.0",
        description:
          "Fitness app api documentation",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            in: 'header',
            name: 'Authorization',
            description: 'Bearer Token',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{
        bearerAuth: [],
      }],
      servers: [
        {
          url: "https://localhost:8080",
        },
      ],
    },
    apis: ["./routes/*.ts"],
  });