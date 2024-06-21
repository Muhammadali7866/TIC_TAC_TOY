const prisma = require("../database/prisma");

exports.updateUserSocket = async (googleId, socketId) => {
  console.log({socketId});
  // lets first fetch the user based in the googleId
  let user = await prisma.user.findFirst({
    where: {
      googleId,
    },
  });
  // now update the user socket id
  await prisma.user.update({
    where: {
      googleId,
    },
    data: {
      socketId,
    },
  });
  console.log({user});
};
