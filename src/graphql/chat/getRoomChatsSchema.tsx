import { gql } from "graphql-request";

export const getRoomChatsDataQuery = "getRoomChats";

const getRoomChatsSchema = gql`
  query GetRoomChats($roomId: ID!, $page: Int!) {
    getRoomChats(roomId: $roomId, page: $page) {
      _id
      room
      sender
      message
      media
      deleted
      createdAt
      updatedAt
    }
  }
`;

export default getRoomChatsSchema;
