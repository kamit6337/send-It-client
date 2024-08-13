import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const userPostsQuery = (id: string, page = 1) => {
  return {
    queryKey: ["user posts", id, page],
    queryFn: () => getReq("/post/user", { page, id }),
    staleTime: 10 * 1000,
    enabled: !!id,
  };
};

const useUserPosts = (id: string, page = 1) => {
  const query = useQuery(userPostsQuery(id, page));

  return query;
};

export default useUserPosts;
