import { gql } from "graphql-request";

export const getUserNotificationsDataQuery = "getUserNotifications";

const getUserNotificationsSchema = gql`
  query GetUserNotifications($page: Int!) {
    getUserNotifications(page: $page) {
      _id
      user
      type
      message
      totalSenders
      sender {
        _id
        name
        email
        photo
      }
      isRead
      post {
        _id
        message
        media
        user {
          _id
          name
          email
          photo
        }
      }
      room {
        _id
      }
    }
  }
`;

export default getUserNotificationsSchema;
