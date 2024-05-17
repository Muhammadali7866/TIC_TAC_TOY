import React from 'react';
// import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <>

    <header className= 'flex items-center justify-between px-20 mt-5'>
    <p className="text-4xl font-medium text-purple-900 dark:text-purple">TIKX</p>
    <a className="bg-purple-500 h-8 w-20 rounded-full flex item-center" href="">Login</a>


    </header>
    
    </>
   
  );
}

export default Navbar;
