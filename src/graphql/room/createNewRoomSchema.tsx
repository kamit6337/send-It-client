import { gql } from "graphql-request";

export const createNewRoomDataQuery = "createNewRoom";

const createNewRoomSchema = gql`
  mutation CreateNewRoom($userId: ID!) {
    createNewRoom(userId: $userId) {
      _id
      users {
        _id
        name
        email
        photo
      }
      createdAt
      updatedAt
    }
  }
`;

export default createNewRoomSchema;
