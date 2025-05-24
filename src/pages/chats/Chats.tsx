import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { roomState } from "@/redux/slice/roomSlice";
import { PARAMS, ROOM } from "@/types";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import useUserRooms from "@/hooks/rooms/useUserRooms";
import ReactIcons from "@/assets/icons";
import ChatMessages from "@/components/chat/ChatMessages";
import { Helmet } from "react-helmet";

const Chats = () => {
  const { id } = useParams<PARAMS>();
  const navigate = useNavigate();
  const { activeRoom } = useSelector(roomState);
  const { data: actualUser } = useLoginCheck();
  const { data: rooms } = useUserRooms();

  useEffect(() => {
    const findRoom = rooms.find((room: ROOM) => room._id === id);

    if (!findRoom) {
      navigate("/messages");
    }
  }, [id, rooms, navigate]);

  const member = useMemo(() => {
    const member = activeRoom?.users.find(
      (user) => user._id !== actualUser._id
    );
    return member;
  }, [id, rooms, actualUser._id]);

  const handleClick = () => {
    navigate("/messages");
  };

  return (
    <>
      <Helmet>
        <title>Messages</title>
        <meta name="messages" content="Message page of this project" />
      </Helmet>
      <div className="h-screen relative">
        {/* NOTE: HEADER */}
        <div className="h-14 w-full text-xl font-semibold tracking-wider sticky top-0 z-10 border-b border-div_border bg-background flex items-center gap-2 px-3">
          <button className="left_arrow" onClick={() => handleClick()}>
            <ReactIcons.leftArrow className="text-xl" />
          </button>

          <p>{member?.name}</p>
        </div>
        <div
          style={{
            height: "calc(100% - 56px)",
          }}
        >
          <ChatMessages />
        </div>
      </div>
    </>
  );
};

export default Chats;
