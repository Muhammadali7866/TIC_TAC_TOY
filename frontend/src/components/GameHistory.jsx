import React from "react";

function GameHistory() {
  const gameHistory = []
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
                  <td className="py-2 px-4 border-b text-center">{game.opponentName}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(game.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">{game.result}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center">No game history available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameHistory;
