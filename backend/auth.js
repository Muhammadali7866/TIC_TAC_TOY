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
    async (accessToken, refreshToken, profile, done) => {
      // fetch user
      let user = await prisma.user.upsert({
        where: {
          googleId: profile.id,
        },
        create: {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
        },
        update: {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
        },
      });
      if (user) {
        await prisma.auth.upsert({
          where: {
            userId: user.id,
          },
          create: {
            userId:user.id,
            email:user.email,
            verificationToken :accessToken,
            verificationTokenExpiration: Date.now() +15*60*1000
          },
          update: {
            verificationToken :accessToken,
            verificationTokenExpiration:Date.now() +15*60*1000
          },
        });
      }

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
