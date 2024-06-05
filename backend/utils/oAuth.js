// const Router = require("./routes");
// const prisma = require("./database/prisma");
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const prisma = require("../database/prisma");
const router = express.Router();

// require("./database/prisma");
require("dotenv").config();
require("../auth");
app.use(
  session({ secret: "secretKey", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirec: "/",
    successRedirect: "/auth/profile",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/auth/profile", (req, res) => {
  console.log(req.user);
  console.log("in profile sectio");
  return res.send("Login succesfully");
});

app.get(
  "/auth/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

module.exports = app;
