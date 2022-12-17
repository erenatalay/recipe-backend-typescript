export const options = {
  swaggerDefinition: {
    info: {
      description:
        "This is a server with enabled Swagger documentation feature", // API uygulamasının açıklaması
      title: "Simple Server", // Swagger arayüzünün başlıkları
      version: "1.0.0", // Swagger'ın API'ın hangi sürümü için üretildiği
    },
    host: "localhost", // API uygulamanızın host name'i yani endpointi
    swagger: "2.0", //  or openapi:'3.0.0' // Burada swagger veya openapi için tanımlamaları görüldüğü şekilde yapabilirsiniz
    basePath: "/v1", // giriş path'i olarak eklenebilir
    produces: [
      // API uygulamasının Üretebileceği veri tipleri
      "application/json",
      "application/xml",
    ],
    schemes: ["http", "https"], // API için kullanılabilecek protocol tipleri belirtilebilir
    securityDefinitions: {
      // Güvenlik için tanımlanabilecek tipler
      JWT: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Basic apiKey authorization in the system",
      },
    },
  },
  basedir: __dirname, //Swagger üretimi için temel alınacak dosyaların hepsi - Routelarınızın bulunduğu klasör olarak ayarlamalısınız
  files: ["../routes/**/*.ts"], //Swagger üretimi
};
