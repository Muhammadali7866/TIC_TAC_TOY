const passport = require("passport");
const prisma = require("./database/prisma");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async(accessToken, refreshToken, profile, done) => {
          // fetch user
          let user = await prisma.user.upsert({
            where:{
              googleId:profile.id
            },
            update:{

            },
            create:{
              googleId:profile.id,
              email:profile.emails[0].value,
              
            }
          })
      return done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
