import getUserRoomsSchema, {
  getUserRoomsDataQuery,
} from "@/graphql/room/getUserRoomsSchema";
import getGraphql from "@/utils/api/graphql";
import { useQuery } from "@tanstack/react-query";

const useUserRooms = (toggle = false) => {
  const query = useQuery({
    queryKey: ["user rooms"],
    queryFn: () => getGraphql(getUserRoomsSchema, getUserRoomsDataQuery),
    staleTime: Infinity,
    enabled: toggle,
  });

  return query;
};

export default useUserRooms;
