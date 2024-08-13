import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const followingQuery = (id: string, page = 1) => {
  return {
    queryKey: ["user following", id, page],
    queryFn: () => getReq("/user/following", { id, page }),
    staleTime: 10 * 1000, //10 seconds,
    enabled: !!id,
  };
};

const useFollowing = (id: string, page = 1) => {
  const query = useQuery(followingQuery(id, page));

  return query;
};

export default useFollowing;
