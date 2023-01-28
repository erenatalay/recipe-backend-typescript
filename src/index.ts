
const express = require("express");
const config = require("./config");
const app = express();
const loaders = require("./loaders")
const swaggerAutogen = require('swagger-autogen')()
const endpointsFiles = ['./routes/user.js']
const routers = require("./routes");
app.use(express.json());

config();
loaders();

app.use("/api",routers);
app.listen(process.env.APP_PORT,() => {
    console.log(`${process.env.APP_PORT} Port Server Start`);
})
