import React, { useState } from 'react';
import Popup from './popup';

function Content() {
 const [showPopup,setShowPopup]=  useState(false)
  return (
    <>
      <div className="flex flex-row justify-center pt-20 bg-black h-screen">
        <button
          className="w-[170px] h-10 border-dotted border-4 border-custom-dark mx-4 opacity-60 text-white text-lg font-thin rounded-md flex items-center justify-center font-sarif hover:bg-custom-dark"
       onClick={()=>setShowPopup(true)} >
          Play with Friend
        </button>
        <a
          className="w-[170px] h-10 border-dotted border-4 border-custom-dark mx-4 opacity-60 text-white text-lg font-thin rounded-md flex items-center justify-center font-sarif hover:bg-custom-dark"
          href="/"
        >
          Play as a Guest
        </a>
    {showPopup && <Popup onClose = {()=>setShowPopup(false)}/>}
      </div>

    </>
  );
}

export default Content;
