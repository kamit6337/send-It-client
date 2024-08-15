import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const userRepliesQuery = (id: string, page = 1) => {
  return {
    queryKey: ["user replies", id, page],
    queryFn: () => getReq("/reply/user", { id, page }),
    staleTime: 10 * 1000,
    enabled: !!id,
  };
};

const useUserReplies = (id: string, page = 1) => {
  const query = useQuery(userRepliesQuery(id, page));
  return query;
};

export default useUserReplies;
