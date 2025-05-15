import getSinglePostSchema, {
  getSinglePostDataQuery,
} from "@/graphql/posts/getSinglePostSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useSinglePost = (postId: string) => {
  const query = useQuery({
    queryKey: ["single post", postId],
    queryFn: () =>
      getGraphql(getSinglePostSchema, getSinglePostDataQuery, { id: postId }),
    staleTime: Infinity,
    enabled: !!postId,
  });

  return query;
};

export default useSinglePost;
