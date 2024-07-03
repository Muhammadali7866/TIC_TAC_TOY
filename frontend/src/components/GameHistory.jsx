import React, { useContext, useEffect, useState } from "react";
import { getGameHistory } from "../services/service";
import UserContext from "../context/UserContext";

function GameHistory() {
  const [gameHistory, setGameHistory] = useState([]);

  const { user } = useContext(UserContext);
  const fetchGameHistory = async () => {
    let history = await getGameHistory(user.id);
    console.log(history);
    setGameHistory(history.data);
  };
  useEffect(() => {
    fetchGameHistory();
  }, []);

  return (
    <div className="h-screen bg-custom-dark text-white p-4 ">
      <h2 className="text-2xl font-semibold mb-4 mt-10 ml-20">Game History</h2>
      <div className="overflow-x-auto w-full max-w-4xl ml-20 mt-3">
        <table className="min-w-full shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-4 border-b border-gray-700">Opponent</th>
              <th className="py-2 px-4 border-b border-gray-700">Date</th>
              <th className="py-2 px-4 border-b border-gray-700">Result</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.length > 0 ? (
              gameHistory.map((game, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="py-2 px-4 border-b border-gray-700 text-center">
                    {game.playerA.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-center">
                    {new Date(game.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-700 text-center">
                    {game.result}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center">
                  No game history available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameHistory;
