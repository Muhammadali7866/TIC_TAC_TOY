const express = require("express");
require("./database/prisma")
const app = express();
const path = require("path");
// const PORT = process.env.PORT||3000;
const PORT = 3000;
require("dotenv").config()


// import user router
const Router = require("./routes");


app.use("/api/user/",Router.users)

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});


// connect backend with public file 
app.use(express.static(path.join(__dirname,"./public")))


// authentiation process
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport")

passport.use(new GoogleStrategy({
  clientID:process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  callbackURL:process.env.CALLBACK_URL
},(accessToken,refreshToken,profile,cb)=>{
  console.log("authenticate user");
  cb(null,{accessToken,profile})
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);
console.log(process.env.CALLBACK_URL);
