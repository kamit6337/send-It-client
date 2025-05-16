import getUserSearchSchema, {
  getUserSearchDataQuery,
} from "@/graphql/user/getUserSearchSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useUserSearch = (search: string) => {
  const query = useQuery({
    queryKey: ["search users", search],
    queryFn: () =>
      getGraphql(getUserSearchSchema, getUserSearchDataQuery, { search }),
    staleTime: Infinity,
    enabled: !!search,
  });

  return query;
};

export default useUserSearch;
