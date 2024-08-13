import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const userFollowingPosts = (page = 1) => {
  return {
    queryKey: ["posts", page],
    queryFn: () => getReq("/post/following", { page }),
    staleTime: false,
  };
};

const usePosts = (page = 1) => {
  const query = useQuery(userFollowingPosts(page));

  return query;
};

export default usePosts;
