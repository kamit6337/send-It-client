import { gql } from "graphql-request";

export const getUserNotificationsDataQuery = "getUserNotifications";

const getUserNotificationsSchema = gql`
  query GetUserNotifications($page: Int!) {
    getUserNotifications(page: $page) {
      _id
      user
      type
      message
      sender {
        _id
        name
        email
        photo
      }
      totalSenders
      isRead
      post
      room
    }
  }
`;

export default getUserNotificationsSchema;
