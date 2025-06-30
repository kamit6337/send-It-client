import { gql } from "graphql-request";

export const isSeenChatDataQuery = "isSeenChat";

const isSeenChatSchema = gql`
  mutation IsSeenChat($chatIds: [ID!]!) {
    isSeenChat(chatIds: $chatIds)
  }
`;

export default isSeenChatSchema;
