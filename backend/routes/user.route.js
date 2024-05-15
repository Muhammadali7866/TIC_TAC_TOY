const router = require("express").Router();
const userController = require("../controllers/user.controllers");

// signUp the use
// router.get("/",(req,res)=>{

// })
router.get("/auth/google", userController.registerUser);
router.get("/auth/callback", userController.loginUser);
router.get('auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/profile', (req, res) => {
  console.log("finally here");
  res.send(req.user);
});

module.exports = router;
