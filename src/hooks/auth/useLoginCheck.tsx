import loginCheckSchema, {
  getLoginCheckDataQuery,
} from "@/graphql/auth/loginCheckSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useLoginCheck = (toggle = true) => {
  const query = useQuery({
    queryKey: ["login check"],
    queryFn: async () => getGraphql(loginCheckSchema, getLoginCheckDataQuery),
    staleTime: Infinity,
    enabled: toggle,
  });

  return query;
};

export default useLoginCheck;
