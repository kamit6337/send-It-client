import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const singlePostQuery = (id: string) => {
  return {
    queryKey: ["single posts", id],
    queryFn: () => getReq("/post", { id }),
    staleTime: 10 * 1000,
    enabled: !!id,
  };
};

const useSinglePost = (id: string) => {
  const query = useQuery(singlePostQuery(id));
  return query;
};

export default useSinglePost;