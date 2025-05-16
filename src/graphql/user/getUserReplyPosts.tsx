import { gql } from "graphql-request";

export const getUserReplyPostsDataQuery = "getUserReplyPosts";

const getUserReplyPosts = gql`
  query GetUserReplyPosts($userId: ID!, $page: Int!) {
    getUserReplyPosts(userId: $userId, page: $page) {
      _id
      message
      media
      createdAt
      updatedAt
      user {
        _id
        name
        email
        photo
      }
      replyPostId {
        _id
        message
        media
        createdAt
        updatedAt
        user {
          _id
          name
          email
          photo
        }
      }
    }
  }
`;

export default getUserReplyPosts;
