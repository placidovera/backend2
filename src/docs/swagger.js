import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Pets",
      version: "1.0.0",
      description: "Documentación del proyecto Pets"
    }
  },

  apis: ["./src/docs/*.yaml"]
};

export const specs = swaggerJsdoc(options);