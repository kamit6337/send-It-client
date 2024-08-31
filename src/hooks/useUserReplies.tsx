import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserReplies = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user replies", id],
    queryFn: ({ pageParam }) => getReq("/reply/user", { page: pageParam, id }),
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

export default useUserReplies;
