
const express = require("express");
const config = require("./config");
const app = express();
const loaders = require("./loaders")
const {options} = require("./documentation/swagger")
const ExpressSwaggerFn = require('express-swagger-producer');
const routers = require("./routes");
app.use(express.json());
const ExpressSwagger = ExpressSwaggerFn(app); 
config();
loaders();
ExpressSwagger(options); 
app.use("/api",routers);
app.listen(process.env.APP_PORT,() => {
    console.log(`${process.env.APP_PORT} Port Server Start`);
})
