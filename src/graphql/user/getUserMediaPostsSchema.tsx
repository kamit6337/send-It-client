import { gql } from "graphql-request";

export const getUserMediaPostsDataQuery = "getUserMediaPosts";

const getUserMediaPostsSchema = gql`
  query GetUserMediaPosts($userId: ID!, $page: Int!) {
    getUserMediaPosts(userId: $userId, page: $page) {
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
`;

export default getUserMediaPostsSchema;
