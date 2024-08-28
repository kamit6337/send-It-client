import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const postRepliesQuery = (id: string, page = 1) => {
  return {
    queryKey: ["post replies", id, page],
    queryFn: () => getReq("/reply/post", { page, id }),
    staleTime: Infinity,
    enabled: !!id,
  };
};

const usePostReplies = (id: string, page: number) => {
  const query = useQuery(postRepliesQuery(id, page));

  return query;
};

export default usePostReplies;
