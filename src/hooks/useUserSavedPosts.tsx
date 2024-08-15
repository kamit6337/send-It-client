import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const userSavePostsQuery = (page = 1) => {
  return {
    queryKey: ["user saved posts", page],
    queryFn: () => getReq("/save/post", { page }),
    staleTime: 10 * 1000,
  };
};

const useUserSavedPosts = (page = 1) => {
  const query = useQuery(userSavePostsQuery(page));

  return query;
};

export default useUserSavedPosts;
