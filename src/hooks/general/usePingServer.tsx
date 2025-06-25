import environment from "@/utils/environment";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePingServer = () => {
  const query = useQuery({
    queryKey: ["ping server"],
    queryFn: () => axios.get(`${environment.SERVER_URL}/health`),
    refetchInterval: 50 * 1000, // 50 seconds
    refetchIntervalInBackground: true,
  });

  return query;
};

export default usePingServer;
