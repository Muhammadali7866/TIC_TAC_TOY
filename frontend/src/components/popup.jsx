// src/components/Popup.js
import React from "react";
import { X } from "lucide-react";
import { Link } from 'react-router-dom';

const Popup = ({onClose}) => {
  return (
    <>
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center ">
        <div className="mt-6 flex flex-col gap-5 text-white">
          <button className="place-self-end text-white">
            <X onClick={onClose} size={30} />
          </button>
          <div className=" bg-blue-800 rounded-lg px-20 py-10 flex flex-col gap-3 items-center">
            <div className="font-medium text-lg"><Link to="/contact">Start Game</Link></div>
            <div className="font-medium text-lg">OR</div>
            <input className="w-full px-1 py-1 text-black rounded-xl" placeholder="Enter your code" type="text" />
            <button className="font-medium text-lg">Enter code</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
