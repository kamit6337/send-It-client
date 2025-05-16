import getUserFollowingsSchema, {
  getUserFollowingsDataQuery,
} from "@/graphql/followers/getUserFollowingsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserFollowings = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user followings", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserFollowingsSchema, getUserFollowingsDataQuery, {
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

export default useUserFollowings;
