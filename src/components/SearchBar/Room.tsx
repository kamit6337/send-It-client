import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useUserRooms from "@/hooks/rooms/useUserRooms";
import { roomState, setActiveRoom } from "@/redux/slice/roomSlice";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatMessages from "../chat/ChatMessages";

type Props = {
  showMessageArea: boolean;
  handleCloseMessage: (value: boolean) => void;
};

const Room = ({ showMessageArea, handleCloseMessage }: Props) => {
  const { activeRoom } = useSelector(roomState);
  const { data: actualUser } = useLoginCheck();
  const dispatch = useDispatch();
  const { data: rooms } = useUserRooms();

  const member = useMemo(() => {
    if (!activeRoom) return { name: "", email: "" };
    const member = activeRoom?.users.find(
      (user) => user._id !== actualUser._id
    );
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
            <button className="left_arrow" onClick={() => handleClick()}>
              <ReactIcons.leftArrow className="text-xl" />
            </button>
          </div>
        )}
        <div>
          <p className="text-xl font-semibold">{member?.name}</p>
          <p className="text-user_name text-sm">{member?.email}</p>
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
