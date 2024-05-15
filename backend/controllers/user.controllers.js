const passport = require("passport");
require("../auth");





exports.registerUser = async (req, res) => {
  try {
    
 
  console.log("in register user");
  passport.authenticate('google', { scope: ['profile', 'email'] })
} catch (error) {
    console.log(error.message);
}
};
exports.loginUser = async (req, res) => {
  passport.authenticate('google', { failureRedirec: '/',successRedirect:"/profile" }),
  (req, res) => {
  res.redirect('/');
}};


