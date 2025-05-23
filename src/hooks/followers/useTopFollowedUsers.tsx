import getTopFollowedUsersSchema, {
  getTopFollowedUsersDataQuery,
} from "@/graphql/followers/getTopFollowedUsersSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useTopFollowedUsers = () => {
  const query = useQuery({
    queryKey: ["top followed users"],
    queryFn: () =>
      getGraphql(getTopFollowedUsersSchema, getTopFollowedUsersDataQuery, {
        page: 1,
      }),
    staleTime: Infinity,
  });

  return query;
};

export default useTopFollowedUsers;
