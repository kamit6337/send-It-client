import { getReq } from "@/utils/api/api";
import { useQuery } from "@tanstack/react-query";

const useUserProfile = (username: string | undefined) => {
  const query = useQuery({
    queryKey: ["user profile", username],
    queryFn: () => getReq("/user", { username }),
    staleTime: Infinity,
    enabled: !!username,
  });

  return query;
};

export default useUserProfile;
