import ReactIcons from "@/assets/icons";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import useLoginCheck from "@/hooks/useLoginCheck";
import ChatMessages from "@/pages/chats/ChatMessages";
import { roomState, setActiveRoom } from "@/redux/slice/roomSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Room = ({ showMessageArea, handleCloseMessage }) => {
  const { rooms, activeRoom } = useSelector(roomState);
  const { data: actualUser } = useLoginCheck();
  const dispatch = useDispatch();

  const member = useMemo(() => {
    const findRoom = rooms?.find((room) => room._id === activeRoom);
    const member = findRoom?.users.find((user) => user._id !== actualUser._id);
    return member;
  }, [activeRoom, rooms, actualUser._id]);

  const handleClick = () => {
    dispatch(setActiveRoom(null));
  };

  return (
    <>
      <div
        className="h-14 flex items-center justify-between px-4 cursor-pointer"
        onClick={() => handleCloseMessage(!showMessageArea)}
      >
        {showMessageArea && (
          <div onClick={(e) => e.stopPropagation()}>
            <LeftArrowBtn handleClick={handleClick} />
          </div>
        )}
        <div>
          <p className="text-xl font-semibold">{member?.name}</p>
          <p className="text-user_name text-sm">@{member?.username}</p>
        </div>

        <div className="flex text-xl">
          <button className="p-2 rounded-full hover:bg-sidebar_link_hover">
            {showMessageArea ? (
              <ReactIcons.doubleArrowDown />
            ) : (
              <ReactIcons.doubleArrowUp />
            )}
          </button>
        </div>
      </div>
      {showMessageArea && (
        <div className="h-96">
          <ChatMessages />
        </div>
      )}
    </>
  );
};

export default Room;
