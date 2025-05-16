import { gql } from "graphql-request";

export const createNewFollowingDataQuery = "createNewFollowing";

const createNewFollowingSchema = gql`
  mutation CreateNewFollowing($userId: ID!) {
    createNewFollowing(userId: $userId)
  }
`;

export default createNewFollowingSchema;
