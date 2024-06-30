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
