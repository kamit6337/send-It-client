import { getReq } from "@/utils/api/api";
import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";

export const userFollowingPosts = (queryClient: QueryClient) => {
  queryClient.prefetchQuery({
    queryKey: ["following posts"],
    queryFn: () => getReq("/following/post", { page: 1 }),
  });
};

const usePosts = () => {
  const query = useInfiniteQuery({
    queryKey: ["following posts"],
    queryFn: ({ pageParam }) => getReq("/following/post", { page: pageParam }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) {
        return undefined;
      }
    },
  });

  return query;
};

export default usePosts;
