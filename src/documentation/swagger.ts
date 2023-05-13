export const options = {
  swaggerDefinition: {
    info: {
      description:
        "This is a server with enabled Swagger documentation feature",
      title: "Simple Server", 
      version: "1.0.0",
    },
    host: "localhost:3000", 
    swagger: "2.0",
    basePath: "/api",
    produces: [
      "application/json",
      "application/xml",
    ],
    schemes: ["http", "https"], 
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Basic apiKey authorization in the system",
      },
    },
  },
  basedir: __dirname,
  files: ["../controller/**/*.ts"], 
};
