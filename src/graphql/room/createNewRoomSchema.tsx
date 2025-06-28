import { gql } from "graphql-request";

export const createNewRoomDataQuery = "createNewRoom";

const createNewRoomSchema = gql`
  mutation CreateNewRoom($userId: ID!) {
    createNewRoom(userId: $userId) {
      _id
      createdAt
      updatedAt
      users {
        _id
        name
        email
        photo
      }
    }
  }
`;

export default createNewRoomSchema;
