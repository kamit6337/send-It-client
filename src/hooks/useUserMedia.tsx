import { getReq } from "@/utils/api/api";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserMedia = (id: string) => {
  const query = useInfiniteQuery({
    queryKey: ["user media", id],
    queryFn: ({ pageParam }) => getReq("/media", { page: pageParam, id }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      } else {
        return lastPageParam + 1;
      }
    },
  });

  return query;
};

export default useUserMedia;
