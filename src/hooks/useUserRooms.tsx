import { addRoomsAndChats } from "@/redux/slice/roomSlice";
import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const userRoomsQuery = (toggle = false) => {
  return {
    queryKey: ["user rooms"],
    queryFn: () => getReq("/room"),
    staleTime: Infinity,
    enabled: toggle,
  };
};

const useUserRooms = (toggle = false) => {
  const dispatch = useDispatch();
  const query = useQuery(userRoomsQuery(toggle));

  useEffect(() => {
    if (query.data) {
      dispatch(addRoomsAndChats(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};

export default useUserRooms;
