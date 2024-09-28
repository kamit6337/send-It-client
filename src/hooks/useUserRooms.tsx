import { joinRooms } from "@/lib/socketIO";
import { addRoomsAndChats } from "@/redux/slice/roomSlice";
import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUserRooms = (toggle = false, actualUser) => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["user rooms"],
    queryFn: () => getReq("/room"),
    staleTime: Infinity,
    enabled: toggle,
  });

  useEffect(() => {
    if (query.data) {
      const rooms = query.data;

      const roomIds = rooms.map((room) => room._id);
      joinRooms([actualUser._id, ...roomIds]);

      dispatch(addRoomsAndChats(rooms));
    }
  }, [query.data, dispatch]);

  return query;
};

export default useUserRooms;
