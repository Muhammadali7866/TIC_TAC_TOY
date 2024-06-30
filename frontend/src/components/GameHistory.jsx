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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Game History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Opponent</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Result</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.length > 0 ? (
              gameHistory.map((game, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{game.playerA.name}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {new Date(game.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
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
