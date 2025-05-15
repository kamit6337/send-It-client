import { gql } from "graphql-request";

export const getUserPostsDataQuery = "getUserPosts";

const getUserPostsSchema = gql`
  query GetUserPosts($userId: ID!, $page: Int!) {
    getUserPosts(userId: $userId, page: $page) {
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

export default getUserPostsSchema;
