import { setActiveRoom } from "@/redux/slice/roomSlice";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROOM } from "@/types";
import useUserRooms from "@/hooks/rooms/useUserRooms";
import ReactIcons from "@/assets/icons";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import Room from "./Room";

type Props = {
  height: string;
  willNavigate?: boolean;
};

const MessageTemplate = ({ height, willNavigate = true }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: rooms } = useUserRooms();
  const { data: actualUser } = useLoginCheck();
  const [search, setSearch] = useState("");
  const [searchedRoom, setSearchedRoom] = useState<ROOM[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      setSearchedRoom([]);
      setSearch("");
      return;
    }

    const searchRoom = rooms.filter((room: ROOM) => {
      const { users } = room;
      const member = users.find((user) => user._id !== actualUser._id);

      return (
        member?.name.toLowerCase().includes(value.toLowerCase()) ||
        member?.email.toLowerCase().includes(value.toLowerCase())
      );
    });

    setSearch(value);
    setSearchedRoom(searchRoom);
  };

  const handleRemoveFocus = () => {
    setIsFocused(false);
    setSearch("");
    setSearchedRoom([]);
  };

  const handleNavigate = (room: ROOM) => {
    console.log("active room template", room);

    dispatch(setActiveRoom(room));

    if (willNavigate) {
      navigate(`/messages/${room._id}`);
    }
  };

  return (
    <main className="h-full" style={{ height: height }}>
      {/* NOTE: HEADER */}
      <div className="h-16 sticky top-16 px-3 flex items-center gap-2">
        {isFocused && (
          <button className="left_arrow" onClick={() => handleRemoveFocus()}>
            <ReactIcons.leftArrow className="text-xl" />
          </button>
        )}
        <div className="flex-1 input_div">
          <input
            value={search}
            className="input"
            placeholder="Search"
            onFocus={() => setIsFocused(true)}
            onBlur={handleRemoveFocus}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* NOTE: SEARCHED ROOMS AND ACTUAL ROOMS */}
      {isFocused ? (
        <div
          className="overflow-y-auto border-r border-div_border"
          style={{ height: "calc(100% - 64px)" }}
        >
          {searchedRoom.length > 0 ? (
            searchedRoom.map((room) => {
              return (
                <Room
                  key={room._id}
                  room={room}
                  handleNavigate={handleNavigate}
                />
              );
            })
          ) : search ? (
            <p className="p-5 text-sm text-grey">No Room Find</p>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          className="overflow-y-auto border-r border-div_border"
          style={{ height: "calc(100% - 64px)" }}
        >
          {rooms.length > 0 ? (
            rooms.map((room: ROOM) => {
              return (
                <Room
                  key={room._id}
                  room={room}
                  handleNavigate={handleNavigate}
                />
              );
            })
          ) : (
            <p className="p-5 text-sm text-grey">No Room Avaliable</p>
          )}
        </div>
      )}
    </main>
  );
};

export default MessageTemplate;
