import getUserPostsSchema, {
  getUserPostsDataQuery,
} from "@/graphql/user/getUserPostsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserPosts = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user posts", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserPostsSchema, getUserPostsDataQuery, {
        userId,
        page: pageParam,
      }),
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

export default useUserPosts;
