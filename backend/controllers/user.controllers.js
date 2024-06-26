const passport = require("passport");
const prisma = require("../database/prisma");
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



exports.gamePlayer = async(req,res)=>{
    try {
      // fetch room id from params
      let {roomId} = req.params
      // fetch users based on the roomId
      let users = await prisma.gamePlayer.findFirst({
        where:{
          roomId
        },
        include:{
          playerA:true,
          playerB:true
        }
      })
      // if not 
      if(!users){
        throw {
          success:false,
          statusCode:400,
          message:"users not found"
        }
      }
      let {playerA,playerB} = users
      
      res.send({playerA,playerB})
      
    } catch (error) {
      const {status} = error;
      const s = status?status:500;
      res.status(s).json({
        status:error.success,
        message:error.message,
        statusCode:error.statusCode
      })
    }
}



exports.gameHistory = (req,res)=>{
  try {
    const {userId} = req.params
    console.log({userId});
    

  } catch (error) {
    const statusCode = error.statusCode ||500
    res.status(statusCode).json({
      success:error.success,
      statusCode:error.statusCode,
      message:error.message
    })
  }
}