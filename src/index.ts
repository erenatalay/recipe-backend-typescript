
const express = require("express");
const config = require("./config");
const app = express();
const connection = require("./database")
app.use(express.json());
config();
connection();

app.listen(process.env.APP_PORT,() => {
    console.log(`${process.env.APP_PORT} Port Server Start`);
})
