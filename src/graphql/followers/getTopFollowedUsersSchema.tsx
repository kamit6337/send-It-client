import { gql } from "graphql-request";

export const getTopFollowedUsersDataQuery = "getTopFollowedUsers";

const getTopFollowedUsersSchema = gql`
  query GetTopFollowedUsers($page: Int!) {
    getTopFollowedUsers(page: $page) {
      _id
      name
      email
      photo
      isFollowed
      followersCount
    }
  }
`;

export default getTopFollowedUsersSchema;
