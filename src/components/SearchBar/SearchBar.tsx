import { useState } from "react";
import { useSelector } from "react-redux";
import { roomState } from "@/redux/slice/roomSlice";
import Room from "./Room";
import UserRooms from "./UserRooms";
import SearchUsers from "./SearchUsers";
import TopFollowedUsers from "./TopFollowedUsers";

const SearchBar = () => {
  const { activeRoom } = useSelector(roomState);
  const [showMessageArea, setShowMessageArea] = useState(false);

  const handleCloseMessage = (bool: boolean) => {
    setShowMessageArea(bool);
  };

  return (
    <>
      <main className="h-full flex flex-col justify-center items-center">
        <div className="fixed top-2 w-[340px]">
          <SearchUsers />
        </div>
        <div className="w-full px-5">
          <TopFollowedUsers />
        </div>
        <div className="fixed z-10 bg-background bottom-0 w-[370px] border border-div_border rounded-t-xl shadow-xl">
          {activeRoom ? (
            <Room
              showMessageArea={showMessageArea}
              handleCloseMessage={handleCloseMessage}
            />
          ) : (
            <UserRooms
              showMessageArea={showMessageArea}
              handleCloseMessage={handleCloseMessage}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default SearchBar;
