import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const useRoomChats = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["room chats", id],
    queryFn: ({ pageParam }) => getReq("/chat", { id, page: pageParam }),
    enabled: !!id,
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      } else {
        return lastPageParam + 1;
      }
    },
  });

  return query;
};

export default useRoomChats;
