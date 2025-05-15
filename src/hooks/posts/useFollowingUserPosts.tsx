import userFollowingPostsSchema, {
  getUserFollowingPostsDataQuery,
} from "@/graphql/posts/userFollowingPostsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFollowingUserPosts = () => {
  const query = useInfiniteQuery({
    queryKey: ["following posts"],
    queryFn: ({ pageParam }) =>
      getGraphql(userFollowingPostsSchema, getUserFollowingPostsDataQuery, {
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

export default useFollowingUserPosts;
