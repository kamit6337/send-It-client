import getUserLikePostsSchema, {
  getUserLikePostsDataQuery,
} from "@/graphql/user/getUserLikePostsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserLikePosts = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user like posts", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserLikePostsSchema, getUserLikePostsDataQuery, {
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

export default useUserLikePosts;
