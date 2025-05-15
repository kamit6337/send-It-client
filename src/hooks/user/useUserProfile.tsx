import getUserProfileSchema, {
  getUserProfileDataQuery,
} from "@/graphql/user/getUserProfileSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = (email: string) => {
  const query = useQuery({
    queryKey: ["user profile", email],
    queryFn: () =>
      getGraphql(getUserProfileSchema, getUserProfileDataQuery, { email }),
    staleTime: Infinity,
    enabled: !!email,
  });

  return query;
};

export default useUserProfile;
