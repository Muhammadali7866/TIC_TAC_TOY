const passport = require("passport");
const prisma = require("./database/prisma");




const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,

    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log({accessToken});
      console.log({refreshToken});
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
passport.deserializeUser(async(obj, done) => {
  // done(null, obj);
   // Deserialize user object (fetch user from database using user ID)
   try {
    const user = await prisma.user.findUnique({
      where: { googleId: obj.id }, // Adjust as per your schema
    });
    done(null, user); // Attach user object to req.user
  } catch (err) {
    done(err, null);
  }
});
