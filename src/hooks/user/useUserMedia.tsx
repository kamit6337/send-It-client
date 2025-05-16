import getUserMediaPostsSchema, {
  getUserMediaPostsDataQuery,
} from "@/graphql/user/getUserMediaPostsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserMedia = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user media posts", userId],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserMediaPostsSchema, getUserMediaPostsDataQuery, {
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

export default useUserMedia;
