import { gql } from "graphql-request";

export const getUserLikePostsDataQuery = "getUserLikePosts";

const getUserLikePostsSchema = gql`
  query GetUserLikePosts($page: Int!) {
    getUserLikePosts(page: $page) {
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
