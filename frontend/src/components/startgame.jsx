


import React from 'react';
// import {Link} from 'react-router-dom'

function Startgame() {
  return (
    <>
     <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
        <div className="mt-6 flex flex-col gap-5 text-white">
          <div className=" bg-blue-800 rounded-lg px-20 py-10 flex flex-col gap-3 items-center">
            <div className="font-medium text-lg">Your Code</div>
            <div className="font-medium text-lg">OR</div>
            <input className="w-full px-1 py-1 text-black rounded-xl" placeholder="Enter your code" type="text" />
            <button className="font-medium text-lg">Enter code</button>
          </div>
        </div>
      </div>
    </>
   
  );
}

export default Startgame;