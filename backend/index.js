const express = require("express");
const Router = require("./routes");
const app = express();
const path = require("path");
const cookieSession = require("cookie-session")
const session = require('express-session');
const passport = require("passport")

require("./database/prisma")
require("dotenv").config()
require("./auth");



app.use(session({ secret: 'secretKey', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



app.get('/auth/google',
 passport.authenticate('google', { scope: ['profile', 'email'] })
 );
app.get('/auth/google/callback',
 passport.authenticate('google', { failureRedirec: '/',successRedirect:"/profile" }),
 (req, res) => {
 res.redirect('/');
 });

 app.get("/profile",(req,res)=>{
  return res.send("ok")
 })


// import user router
// app.use("/",Router.users)
// connect backend with public file 
app.use(express.static(path.join(__dirname,"./public")))

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
