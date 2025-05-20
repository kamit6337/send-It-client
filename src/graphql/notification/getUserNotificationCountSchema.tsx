import { gql } from "graphql-request";

export const getUserNotificationCountDataQuery = "getUserNotificationCount";

const getUserNotificationCountSchema = gql`
  query GetUserNotificationCount {
    getUserNotificationCount
  }
`;

export default getUserNotificationCountSchema;
