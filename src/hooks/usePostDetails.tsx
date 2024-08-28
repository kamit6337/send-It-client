import { useQuery } from "@tanstack/react-query";
import { getReq } from "../utils/api/api";

const usePostDetails = (id: string) => {
  const query = useQuery({
    queryKey: ["post details", id],
    queryFn: () => getReq("/post/details", { id }),
    enabled: false,
  });

  return query;
};

export default usePostDetails;
