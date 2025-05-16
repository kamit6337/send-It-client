import getUserReplyPosts, {
  getUserReplyPostsDataQuery,
} from "@/graphql/user/getUserReplyPosts";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserReplyPosts = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user reply posts", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserReplyPosts, getUserReplyPostsDataQuery, {
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

export default useUserReplyPosts;
