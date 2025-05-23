import { gql } from "graphql-request";

export const createNewRoomDataQuery = "createNewRoom";

const createNewRoomSchema = gql`
  mutation CreateNewRoom($userId: ID!) {
    createNewRoom(userId: $userId)
  }
`;

export default createNewRoomSchema;
