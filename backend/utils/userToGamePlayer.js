const prisma = require("../database/prisma");

exports.userToGamePlayer = async (googleId, roomId) => {
  // first feth the user form the db
  let user = await prisma.user.findFirst({
    where: {
      googleId,
    },
  });
  if (!user) {
    return {
      messsage: "user not found: unable to add player to game player",
    };
  }

  // now add user to game play
  let gamePlayer = await prisma.gamePlayer.upsert({
    where: {
      roomId,
    },
    update: {
      playerBId: user.id,
    },
    create: {
      playerAId: user.id,
      roomId,
    },
  });
  console.log({ gamePlayer });
};
