const router = require("express").Router();
const userController = require("../controllers/user.controllers");
const passport = require("passport")
const express = require("express");
const prisma = require("../database/prisma");
const app = express();

// // signUp the use
// // router.get("/",(req,res)=>{

// // })
// // router.get("/google", userController.registerUser);
// // router.get("/google", (req,res)=>{
// //   passport.authenticate('google', { scope: ['profile', 'email'] })

// // });
// router.get("/login", userController.loginUser);
// router.get('auth/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });

// router.get('/profile', (req, res) => {
//   console.log("finally here");
//   res.send(req.user);
// });



// app.get('/auth/google',
//  passport.authenticate('google', { scope: ['profile', 'email'] })
//  );


router.get("/",async(req,res)=>{
  // fetch user profile based on thier id
  let {userId} = req.params;

  // fetch from db
  let user = await prisma.user.findFirst({ 
    where:{

    }
  })
})

module.exports = router;
