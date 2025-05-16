import { gql } from "graphql-request";

export const removeSingleFollowingDataQuery = "removeSingleFollowing";

const removeSingleFollowingSchema = gql`
  mutation removeSingleFollowing($userId: ID!) {
    removeSingleFollowing(userId: $userId)
  }
`;

export default removeSingleFollowingSchema;
