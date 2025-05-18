import { gql } from "graphql-request";

export const createNewChatDataQuery = "createNewChat";

const createNewChatSchema = gql`
  mutation CreateNewChat($roomId: ID!, $message: String, $media: String) {
    createNewChat(roomId: $roomId, message: $message, media: $media) {
      _id
      room
      sender
      message
      media
      createdAt
      updatedAt
    }
  }
`;

export default createNewChatSchema;
