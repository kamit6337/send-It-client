import postDetailsSchema, {
  getPostDetailsDataQuery,
} from "@/graphql/posts/postDetailsSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const usePostDetails = (postId: string, inView: boolean) => {
  const query = useQuery({
    queryKey: ["post details", postId],
    queryFn: () =>
      getGraphql(postDetailsSchema, getPostDetailsDataQuery, { id: postId }),
    staleTime: Infinity,
    enabled: !!postId && inView,
  });

  return query;
};

export default usePostDetails;
