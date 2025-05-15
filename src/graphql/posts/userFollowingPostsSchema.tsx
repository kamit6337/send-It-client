import { gql } from "graphql-request";

export const getUserFollowingPostsDataQuery = "getUserFollowingPosts";

const userFollowingPostsSchema = gql`
  query GetUserFollowingPosts($page: Int!) {
    getUserFollowingPosts(page: $page) {
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

export default userFollowingPostsSchema;
