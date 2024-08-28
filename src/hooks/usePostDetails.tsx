import { useQuery } from "@tanstack/react-query";
import { getReq } from "../utils/api/api";

const usePostDetails = (id: string, inView: boolean) => {
  const query = useQuery({
    queryKey: ["post details", id],
    queryFn: () => getReq("/post/details", { id }),
    staleTime: Infinity,
    enabled: inView,
  });

  return query;
};

export default usePostDetails;
