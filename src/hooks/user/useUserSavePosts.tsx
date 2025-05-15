import getUserSavePostsSchema, {
  getUserSavePostsDataQuery,
} from "@/graphql/user/getUserSavePostsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserSavePosts = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user save posts", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserSavePostsSchema, getUserSavePostsDataQuery, {
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

export default useUserSavePosts;
