import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function Navbar() {
  const { user, handleLogout } = useContext(UserContext);

  const handleLogoutt = async () => {
    try {
      const response = await fetch("http://localhost:8000/logout", {
        method: "GET",
        credentials: "include", // Important for sending cookies
      });
      if (response.ok) {
        handleLogout(); // Update user state on successful logout
        window.location.href = "http://localhost:3000" // Redirect to home page or login page
      } else {
        throw new Error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Handle logout error if needed
    }
  };

  return (
    <>
      <header className="flex flex-row justify-between px-20 h-[70px] header nav">
        <div className="flex flex-row justify-evenly w-[600px] h-[70px] mt-3">
          <p className="text-4xl font-medium text-purple-900 dark:text-purple font-serif">
            TIKX
          </p>
          <div className="flex flex-row mt-2 h-[50px] justify-between w-[330px]">
            {user ? (
              <>
                <Link
                  className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
                  to="/profile"
                >
                  Profile
                </Link>
                <Link
                  className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
                  to="/history"
                >
                  History
                </Link>
                <Link
                  className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
                  to="/friends"
                >
                  Friends
                </Link>
                <Link
                  className="text-lg font-medium text-purple-600 dark:text-purple font-serif"
                  to="/online"
                >
                  Online
                </Link>
              </>
            ) : null /* Render nothing when user is not logged in */}
          </div>
        </div>
        {user ? (
          <button
            className="bg-purple-700 h-9 w-[100px] rounded-full flex items-center justify-center text-lg text-black font-serif mt-4"
            onClick={handleLogoutt}
          >
            Logout
          </button>
        ) : (
          <Link
            className="bg-purple-700 h-9 w-[100px] rounded-full flex items-center justify-center text-lg text-black font-serif mt-4"
            to="http://localhost:8000/auth/login"
          >
            Login
          </Link>
        )}
      </header>
    </>
  );
}

export default Navbar;
