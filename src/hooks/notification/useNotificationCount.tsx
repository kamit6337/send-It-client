import getUserNotificationCountSchema, {
  getUserNotificationCountDataQuery,
} from "@/graphql/notification/getUserNotificationCountSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useNotificationCount = () => {
  const query = useQuery({
    queryKey: ["notification count"],
    queryFn: () =>
      getGraphql(
        getUserNotificationCountSchema,
        getUserNotificationCountDataQuery
      ),
    staleTime: Infinity,
  });

  return query;
};

export default useNotificationCount;
