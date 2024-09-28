import { useNavigate, useParams } from "react-router-dom";
import ChatMessages from "./ChatMessages";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { roomState } from "@/redux/slice/roomSlice";
import useLoginCheck from "@/hooks/useLoginCheck";
import { Params } from "@/types";

const Chats = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const { rooms } = useSelector(roomState);
  const { data: actualUser } = useLoginCheck();

  useEffect(() => {
    const findRoom = rooms.find((room) => room._id === id);

    if (!findRoom) {
      navigate("/messages");
    }
  }, [id, rooms, navigate]);

  const member = useMemo(() => {
    const findRoom = rooms.find((room) => room._id === id);
    const member = findRoom?.users.find((user) => user._id !== actualUser._id);
    return member;
  }, [id, rooms, actualUser._id]);

  const handleClick = () => {
    navigate("/messages");
  };

  return (
    <div className="h-screen relative">
      {/* NOTE: HEADER */}
      <div className="h-14 w-full text-xl font-semibold tracking-wider sticky top-0 z-10 border-b border-div_border bg-background flex items-center gap-2 px-3">
        <LeftArrowBtn handleClick={handleClick} />
        <p>{member?.name}</p>
      </div>
      <div
        style={{
          height: "calc(100% - 56px)",
        }}
      >
        <ChatMessages id={id} />
      </div>
    </div>
  );
};

export default Chats;
