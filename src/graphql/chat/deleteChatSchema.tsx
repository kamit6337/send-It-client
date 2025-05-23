import { gql } from "graphql-request";

export const deleteChatDataQuery = "deleteChat";

const deleteChatSchema = gql`
  mutation DeleteChat($chatId: ID!, $roomId: ID!) {
    deleteChat(chatId: $chatId, roomId: $roomId)
  }
`;

export default deleteChatSchema;
