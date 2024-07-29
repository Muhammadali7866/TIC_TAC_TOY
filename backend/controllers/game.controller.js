const prisma = require("../database/prisma");

exports.getUserFriends = async (req, res) => {
  try {
    console.log("innnnn");
    let { id } = req.params;
    id = parseInt(id) 
    let friends = [];
    let allFriends = await prisma.friendShip.findMany({
      where: {
        OR: [{ requestedId: id }, { requesterId: id }],
      },
      include: {
        sendRequest: true,
        receivedRequests: true,
      },
    });
    allFriends.forEach((friend) => {

      if (friend.requesterId === id) {
        friends.push({
          picture: friend.receivedRequests.profilePicture,
          name: friend.receivedRequests.name,
        });
      } else if (friend.requestedId === id) {
        friends.push({
          picture: friend.sendRequest.profilePicture,
          name: friend.sendRequest.name,
        });
      }
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
    console.log({ userAId, userBId });
    let friends = await prisma.friendShip.findFirst({
      where: {
        AND: [
          {
            OR: [
              { requestedId: parseInt(userAId) },
              { requesterId: parseInt(userAId) },
            ],
          },
          {
            OR: [
              { requestedId: parseInt(userBId) },
              { requesterId: parseInt(userBId) },
            ],
          },
        ],
      },
    });
    return res.json({
      success: false,
      status: 200,
      data: friends.status,
    });
  } catch (error) {
    console.log({ error });
  }
};
