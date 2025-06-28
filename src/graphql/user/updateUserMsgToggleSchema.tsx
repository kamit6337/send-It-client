import { gql } from "graphql-request";

export const updateUserMsgToggleDataQuery = "updateUserMsgToggle";

const updateUserMsgToggleSchema = gql`
  mutation UpdateUserMsgToggle($messageBy: MESSAGE_TYPE!) {
    updateUserMsgToggle(messageBy: $messageBy)
  }
`;

export default updateUserMsgToggleSchema;
