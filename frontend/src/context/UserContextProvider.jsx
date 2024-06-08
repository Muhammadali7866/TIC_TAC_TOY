import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/currentUser", {
          credentials: "include", // Include credentials for cookies
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.log("Fetch current user error:", error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
  };

  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
