// 1. Import dependencies
const express = require("express");
const app = express();
// module that loads environment variables from a .env file into process.env
require("dotenv").config();

// Allow parsing on request bodies
app.use(express.json());

//  Import routes 
const watsonRoutes = require("./routes/watson");
// Direct requests to watson to /Watson Routes
app.use("/watson", watsonRoutes);

//  Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server listening on port ", port);
});