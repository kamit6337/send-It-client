import { gql } from "graphql-request";

export const getUserRoomsDataQuery = "getUserRooms";

const getUserRoomsSchema = gql`
  query GetUserRooms {
    getUserRooms {
      _id
      createdAt
      updatedAt
      users {
        _id
        name
        email
        photo
      }
      unSeenChatsCount
    }
  }
`;

export default getUserRoomsSchema;
