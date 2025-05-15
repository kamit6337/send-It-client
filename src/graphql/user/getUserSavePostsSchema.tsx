import { gql } from "graphql-request";

export const getUserSavePostsDataQuery = "getUserSavePosts";

const getUserSavePostsSchema = gql`
  query GetUserSavePosts($userId: ID!, $page: Int!) {
    getUserSavePosts(userId: $userId, page: $page) {
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

export default getUserSavePostsSchema;
