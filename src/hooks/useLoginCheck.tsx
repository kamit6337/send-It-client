import { getAuthReq } from "@/utils/api/authApi";
import { useQuery } from "@tanstack/react-query";

const useLoginCheck = () => {
  const query = useQuery({
    queryKey: ["login check"],
    queryFn: () => getAuthReq("/login/check"),
    staleTime: Infinity,
    retry: false,
    refetchInterval: 15 * 60 * 1000, // 15 minutes
    refetchIntervalInBackground: true,
  });

  return query;
};

export default useLoginCheck;
