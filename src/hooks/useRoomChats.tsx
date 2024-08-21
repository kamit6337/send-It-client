import { addChats } from "@/redux/slice/roomSlice";
import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const roomChatsQuery = (id: string) => {
  return {
    queryKey: ["room chats", id],
    queryFn: () => getReq("/chat", { id }),
    enabled: !!id,
    staleTime: Infinity,
  };
};

const useRoomChats = (id: string) => {
  const dispatch = useDispatch();
  const query = useQuery(roomChatsQuery(id));

  useEffect(() => {
    if (query.data) {
      dispatch(addChats(query.data));
    }
  }, [query.data, dispatch]);

  return query;
};

export default useRoomChats;
