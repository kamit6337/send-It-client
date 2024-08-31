import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFollowers = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user followers", id],
    queryFn: ({ pageParam }) => getReq("/follower", { page: pageParam, id }),
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

export default useFollowers;
