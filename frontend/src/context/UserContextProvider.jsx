import { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [roomSize, setRoomSize] = useState(0);
  return (
    <UserContext.Provider value={{ roomSize, setRoomSize }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
