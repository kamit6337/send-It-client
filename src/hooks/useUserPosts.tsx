import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserPosts = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user posts", id],
    queryFn: ({ pageParam }) => getReq("/user/post", { page: pageParam, id }),
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

export default useUserPosts;
