import { gql } from "graphql-request";

export const getUserFollowersDataQuery = "getUserFollowers";

const getUserFollowersSchema = gql`
  query GetUserFollowers($userId: ID!, $page: Int!) {
    getUserFollowers(userId: $userId, page: $page) {
      _id
      name
      email
      photo
      isFollowed
    }
  }
`;

export default getUserFollowersSchema;
