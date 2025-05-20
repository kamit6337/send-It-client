import getUserNotificationsSchema, {
  getUserNotificationsDataQuery,
} from "@/graphql/notification/getUserNotificationsSchema";
import getGraphql from "@/utils/api/graphql";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUserNotification = () => {
  const query = useInfiniteQuery({
    queryKey: ["user notification"],
    queryFn: ({ pageParam }) =>
      getGraphql(getUserNotificationsSchema, getUserNotificationsDataQuery, {
        page: pageParam,
      }),
    staleTime: Infinity,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });

  return query;
};

export default useUserNotification;
