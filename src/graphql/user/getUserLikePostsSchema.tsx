import { gql } from "graphql-request";

export const getUserLikePostsDataQuery = "getUserLikePosts";

const getUserLikePostsSchema = gql`
  query GetUserLikePosts($userId: ID!, $page: Int!) {
    getUserLikePosts(userId: $userId, page: $page) {
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

export default getUserLikePostsSchema;
