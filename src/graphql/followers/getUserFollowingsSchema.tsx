import { gql } from "graphql-request";

export const getUserFollowingsDataQuery = "getUserFollowings";

const getUserFollowingsSchema = gql`
  query GetUserFollowings($userId: ID!, $page: Int!) {
    getUserFollowings(userId: $userId, page: $page) {
      _id
      name
      email
      photo
      isFollowed
    }
  }
`;

export default getUserFollowingsSchema;
