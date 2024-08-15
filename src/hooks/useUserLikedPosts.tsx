import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const userLikePostsQuery = (page = 1) => {
  return {
    queryKey: ["user liked posts", page],
    queryFn: () => getReq("/like/post", { page }),
    staleTime: 10 * 1000,
  };
};

const useUserLikedPosts = (page = 1) => {
  const query = useQuery(userLikePostsQuery(page));

  return query;
};

export default useUserLikedPosts;
