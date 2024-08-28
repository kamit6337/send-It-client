import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const userMediaQuery = (id: string, page = 1) => {
  return {
    queryKey: ["user media", id, page],
    queryFn: () => getReq("/media", { id, page }),
    staleTime: Infinity,
    enabled: !!id,
  };
};

const useUserMedia = (id: string, page = 1) => {
  const query = useQuery(userMediaQuery(id, page));

  return query;
};

export default useUserMedia;
