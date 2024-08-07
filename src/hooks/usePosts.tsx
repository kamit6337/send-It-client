import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const usePosts = (page = 1) => {
  const query = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getReq("/post/following", { page }),
    staleTime: Infinity,
  });

  return query;
};

export default usePosts;
