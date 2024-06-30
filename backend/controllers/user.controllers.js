const passport = require("passport");
const prisma = require("../database/prisma");
require("../auth");

exports.registerUser = async (req, res) => {
  try {
    console.log("in register user");
    passport.authenticate("google", { scope: ["profile", "email"] });
  } catch (error) {
    console.log(error.message);
  }
};
exports.loginUser = async (req, res) => {
  passport.authenticate("google", {
    failureRedirec: "/",
    successRedirect: "/profile",
  }),
    (req, res) => {
      res.redirect("/");
    };
};

exports.gamePlayer = async (req, res) => {
  try {
    // fetch room id from params
    let { roomId } = req.params;
    // fetch users based on the roomId
    let users = await prisma.gamePlayer.findFirst({
      where: {
        roomId,
      },
      include: {
        playerA: true,
        playerB: true,
      },
    });
    // if not
    if (!users) {
      throw {
        success: false,
        statusCode: 400,
        message: "users not found",
      };
    }
    let { playerA, playerB } = users;

    res.send({ playerA, playerB });
  } catch (error) {
    const { status } = error;
    const s = status ? status : 500;
    res.status(s).json({
      status: error.success,
      message: error.message,
      statusCode: error.statusCode,
    });
  }
};

exports.gameHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log({ userId });

    // Ensure the userId is used to filter the results
    let histories = await prisma.gamePlayer.findMany({
      where: {
        AND: [
          {
            OR: [{ playerAId: Number(userId) }, { playerBId: Number(userId) }],
          },
          {
            result: {
              not: null,
            },
          },
        ],
      }, // Assuming userId is a number
      include:{
        playerA:true,
        playerB:true
      }
    });

    // make response according to requirement
    histories.forEach((history) => {
      const userWin = history.result.split(" ")[0];
      console.log(history.playerAId);
      if (history.playerAId == userId) {
        if (userWin === "playerA") {
          history.result = "win";
          history.opponent= history.playerB.name
        } else if (userWin === "playerB") {
          history.result = "loss";
          history.opponent= history.playerB.name

        }
      } else if (history.playerBId == userId) {
        if (userWin === "playerB") {
          history.result = "win";
          history.opponent= history.playerA.name

        } else if (userWin === "playerA") {
          history.result = "loss";
          history.opponent= history.playerA.name
        }
      }
      return history;
    });

    // Respond with the retrieved histories
    res.status(200).json({
      success: true,
      data: histories,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      success: false,
      statusCode: error.statusCode,
      message: error.message,
    });
  }
};
