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
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: true,
 
}));
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirec: "/",
    successRedirect: "http://localhost:3000/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

app.get("/auth/profile", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send("Login succesfully");
    
  }
  res.redirect('/auth/login');
  console.log(req.user);
});

app.get(
  "/auth/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

module.exports = app;
