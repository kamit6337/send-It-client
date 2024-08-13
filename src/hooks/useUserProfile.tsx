import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

export const userProfileQuery = (username: string | undefined) => {
  return {
    queryKey: ["user profile", username],
    queryFn: () => getReq("/user", { username }),
    staleTime: 10 * 1000, //10 seconds
    enabled: !!username,
  };
};

const useUserProfile = (username: string | undefined) => {
  const query = useQuery(userProfileQuery(username));

  return query;
};

export default useUserProfile;
