import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const useUserPosts = (id: string, page = 1) => {
  const query = useQuery({
    queryKey: ["user posts", id, page],
    queryFn: () => getReq("/post/user", { page, id }),
    staleTime: Infinity,
    enabled: !!id,
  });

  return query;
};

export default useUserPosts;
