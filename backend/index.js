const express=  require("express")
const path = require("path")
const Router = require("./routes");
const prisma = require("./database/prisma");
require("./database/prisma");
const app = require("./utils/oAuth");


// const cors = require('cors');
// app.use(cors());


// connect backend with public file
app.use(express.static(path.join(__dirname, "./public")));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});


module.exports = app;