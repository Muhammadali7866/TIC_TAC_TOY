const express = require("express");
require("./database/prisma")
const app = express();
const PORT = process.env.PORT||3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
