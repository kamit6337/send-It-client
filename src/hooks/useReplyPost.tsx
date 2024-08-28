import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const replyPostQuery = (id: string | undefined) => {
  return {
    queryKey: ["post reply", id],
    queryFn: () => getReq("/reply", { id }),
    staleTime: Infinity,
    enabled: !!id,
  };
};

const useReplyPost = (id: string | undefined) => {
  const query = useQuery(replyPostQuery(id));
  return query;
};

export default useReplyPost;
