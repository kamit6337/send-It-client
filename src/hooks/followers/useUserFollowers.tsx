import getUserFollowersSchema, {
  getUserFollowersDataQuery,
} from "@/graphql/followers/getUserFollowersSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserFollowers = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user followers", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserFollowersSchema, getUserFollowersDataQuery, {
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

export default useUserFollowers;
