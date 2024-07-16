import axios from "axios";

export function getGamePlayer(roomId) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      url: `http://localhost:8000/api/v1/users/gamePlayer/${roomId}`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log({ dataAPI: response.data });
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

export function getGameHistory(userId) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      url: `http://localhost:8000/api/v1/users/game-history/${userId}`,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.data) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        console.log({ error });
        reject(error);
      });
  });
}

export function checkFriendShipStatus(playerAId, playerBID) {
  const data = {
    userAId: playerAId,
    userBId: playerBID,
  };
  return new Promise((resolve, reject) => {
    let config = {
      method: "post",
      url: `http://localhost:8000/api/v1/game/friendShip-status`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          resolve(response.data);
        } else {
          reject(new Error("No data received"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
