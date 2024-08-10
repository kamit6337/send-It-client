import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const useUserLikedPosts = (page = 1) => {
  const query = useQuery({
    queryKey: ["user liked posts", page],
    queryFn: () => getReq("/post/like", { page }),
    staleTime: Infinity,
  });

  return query;
};

export default useUserLikedPosts;
