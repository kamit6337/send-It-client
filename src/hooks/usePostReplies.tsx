import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePostReplies = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["post replies", id],
    queryFn: ({ pageParam }) => getReq("/reply/post", { page: pageParam, id }),
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

export default usePostReplies;
