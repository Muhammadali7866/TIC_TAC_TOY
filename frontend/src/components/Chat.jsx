import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { userFriends } from "../services/service";
import UserContext from "../context/UserContext";
function Chat() {
  const [allFriends, setAllFriends] = useState([]);
  const [currentFriend, setCurrentFriend] = useState([]);
  const { user } = useContext(UserContext);
  const getUserFriends = async () => {
    let friends = await userFriends(1);
    setAllFriends(friends.friends);
  };
  useEffect(() => {
    getUserFriends();
  }, []);

  const updateUserChat = (friend) => {
    console.log(`In update chat ${friend}`);
    setCurrentFriend(friend);
    console.log(currentFriend);
  };

  return (
    <>
      <div className="bg-custom-dark flex justify-center items-center min-h-screen">
        <div className="w-[1100px] h-[700px]  flex justify-around items-center rounded-lg border-20 bg-[#142534]">
          <div className="rounded-lg w-[370px] h-[585px] bg-[#172a3a]">
            <div className="w-[180px] h-[47px] rounded-md mt-2 ml-3 px-1 py-1 ">
              <input
                className="bg-[#172a3a] border-black"
                type="text"
                placeholder="search"
              />
            </div>
            {allFriends.length > 0 &&
              allFriends.map((friend) => (
                <div
                  className=" w-[325px] h-[70px] ml-5 rounded-sm flex border border-black mt-3"
                  onClick={() => updateUserChat(friend)} // Pass the function reference correctly
                  // key={friend.id} // Add a key prop to each mapped item for React's reconciliation
                >
                  <div className="px-1 py-1">
                    {" "}
                    <img
                      src={friend?.picture}
                      alt={`${user?.name}'s profile`}
                      className="w-14 h-14 rounded-full mr-4 border-2"
                    />
                  </div>
                  {/* right div meessage name and last seen  */}
                  <div className="flex flex-col mt-1">
                    <div className="font-bold text-lg">{friend?.name}</div>
                    <div>message recent</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="rounded-lg w-[600px] h-[585px] flex flex-col justify-between">
            <div className="w-[600px] h-[75px] rounded-lg bg-[#172a3a] flex">
              <div className="px-1 py-1 ml-2">
                {" "}
                <img
                  src={currentFriend?.picture}
                  alt={`'s profile`}
                  className="w-11 h-11 rounded-full mr-3 border-2 mt-3 ml-4"
                />
              </div>{" "}
              <div className="font-bold mt-4 ml-2 text-[23px] text-white">
                {currentFriend.name}
              </div>
            </div>
            <div className="flex gap-7">
              <div className="w-[550px] h-[55px] rounded-lg bg-[#172a3a]">
                <input
                  className="bg-[#172a3a] w-[550px] h-[55px] rounded-lg  "
                  type="text"
                  placeholder="search"
                />{" "}
              </div>
              <button>
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="text-white text-2xl mt-3 mr-3"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
