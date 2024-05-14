const router = require("express").Router();
const userController = require("../controllers/user.controllers");

// signUp the use
// router.get("/",(req,res)=>{

// })
router.get("/auth/google", userController.registerUser);
router.get("/auth/callback", userController.loginUser);
router.get("/protected", () => {
  console.log("sucessfully there");
});

module.exports = router;
