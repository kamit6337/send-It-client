import getPostRepliesSchema, {
  getPostRepliesDataQuery,
} from "@/graphql/reply/getPostRepliesSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePostReplies = (postId: string) => {
  const query = useInfiniteQuery({
    queryKey: ["reply posts", postId],
    queryFn: ({ pageParam }) =>
      getGraphql(getPostRepliesSchema, getPostRepliesDataQuery, {
        postId,
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

export default usePostReplies;
