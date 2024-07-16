const prisma = require("../database/prisma");

exports.getUserFriends = async (req, res) => {
  try {
    console.log("innnnn");
    const { id } = req.params;
    let friends = await prisma.friendShip.findMany({
      where: {
        OR: [{ requestedId: parseInt(id) }, { requesterId: parseInt(id) }],
      },
      include: {
        sendRequest: true,
        receivedRequests: true,
      },
    });
    return res.json({
      success: true,
      status: 200,
      friends,
    });
  } catch (error) {
    console.log({ error });
  }
};
exports.checkFriendShipStatus = async (req, res) => {
  try {
    console.log("in api");
    const { userAId, userBId } = req.body;
    console.log({userAId,userBId

    });
    let friends = await prisma.friendShip.findFirst({
      where: {
        AND: [
          {
            OR: [{ requestedId: parseInt(userAId) }, { requesterId: parseInt(userAId) }],
          },
          {
            OR: [{ requestedId: parseInt(userBId) }, { requesterId: parseInt(userBId) }],
          },
        ],
      },
    });
    return res.json({
      success: false,
      status: 200,
      data:friends.status,
    });
  } catch (error) {
    console.log({ error });
  }
};
