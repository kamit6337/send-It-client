import { gql } from "graphql-request";

export const updateNotificationListDataQuery = "updateNotificationList";

const updateNotificationListSchema = gql`
  mutation UpdateNotificationList($ids: [ID!]!) {
    updateNotificationList(ids: $ids)
  }
`;

export default updateNotificationListSchema;
