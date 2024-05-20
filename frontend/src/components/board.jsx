import React from "react";
// import {Link} from 'react-router-dom'

function Board() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="grid grid-cols-3 gap-2 w-64 h-64">
          {cells.map((cell, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-full bg-white border-2 border-gray-400"
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
