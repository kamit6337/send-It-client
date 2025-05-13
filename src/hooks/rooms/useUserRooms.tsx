import { addRooms } from "@/redux/slice/roomSlice";
import { ROOM } from "@/types";
import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUserRooms = (toggle = false) => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ["user rooms"],
    queryFn: () => getReq("/room"),
    staleTime: Infinity,
    enabled: toggle,
  });

  useEffect(() => {
    if (query.data) {
      const rooms = query.data as ROOM[];
      const roomIds = rooms.map((room) => room._id);
      dispatch(addRooms(roomIds));
    }
  }, [query, dispatch]);

  return query;
};

export default useUserRooms;
