import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const replyPostQuery = (id: string) => {
  return {
    queryKey: ["post reply", id],
    queryFn: () => getReq("/reply", { id }),
    staleTime: 10 * 1000,
    enabled: !!id,
  };
};

const useReplyPost = (id: string) => {
  const query = useQuery(replyPostQuery(id));
  return query;
};

export default useReplyPost;
