const express=  require("express")
const path = require("path")
const Router = require("./routes");
const prisma = require("./database/prisma");
require("./database/prisma");
const app = require("./utils/oAuth");




// connect backend with public file
app.use(express.static(path.join(__dirname, "./public")));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});


module.exports = app;