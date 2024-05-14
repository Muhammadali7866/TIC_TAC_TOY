const passport = require("passport");

exports.registerUser = async (req, res) => {
  console.log("in register user");
  passport.authenticate('google', { scope: ['profile'] });
};
exports.loginUser = async (req, res) => {
  passport.authenticate("google", {
    successRedirect:"/api/user/protected" })
};


