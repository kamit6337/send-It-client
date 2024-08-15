import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const followersQuery = (id: string, page = 1) => {
  return {
    queryKey: ["user followers", id, page],
    queryFn: () => getReq("/follower", { id, page }),
    staleTime: 10 * 1000, //10 seconds,
    enabled: !!id,
  };
};

const useFollowers = (id: string, page = 1) => {
  const query = useQuery(followersQuery(id, page));
  return query;
};

export default useFollowers;
