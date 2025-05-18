import getRoomChatsSchema, {
  getRoomChatsDataQuery,
} from "@/graphql/chat/getRoomChatsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useRoomChats = (roomId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["room chats", roomId],
    queryFn: ({ pageParam }) =>
      getGraphql(getRoomChatsSchema, getRoomChatsDataQuery, {
        roomId,
        page: pageParam,
      }),
    staleTime: Infinity,
    enabled: !!roomId,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });

  return query;
};

export default useRoomChats;
