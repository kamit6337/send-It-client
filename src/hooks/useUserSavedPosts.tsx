import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserSavedPosts = () => {
  const query = useInfiniteQuery({
    queryKey: ["user saved posts"],
    queryFn: ({ pageParam }) => getReq("/save/post", { page: pageParam }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      } else {
        return lastPageParam + 1;
      }
    },
  });

  return query;
};

export default useUserSavedPosts;
