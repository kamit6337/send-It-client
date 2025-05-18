import { gql } from "graphql-request";

export const deleteRoomDataQuery = "deleteRoom";

const deleteRoomSchema = gql`
  mutation DeleteRoom($roomId: ID!) {
    deleteRoom(roomId: $roomId)
  }
`;

export default deleteRoomSchema;
