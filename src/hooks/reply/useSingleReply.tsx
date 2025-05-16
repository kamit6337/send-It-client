import getSingleReplySchema, {
  getSingleReplyDataQuery,
} from "@/graphql/reply/getSingleReplySchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useSingleReply = (postId: string) => {
  const query = useQuery({
    queryKey: ["single reply", postId],
    queryFn: () =>
      getGraphql(getSingleReplySchema, getSingleReplyDataQuery, { postId }),
    staleTime: Infinity,
    enabled: !!postId,
  });
  return query;
};

export default useSingleReply;
