import { gql } from "graphql-request";

export const isCurrentUserFollowDataQuery = "isCurrentUserFollow";

const isCurrentUserFollowSchema = gql`
  query IsCurrentUserFollow($userId: ID!) {
    isCurrentUserFollow(userId: $userId)
  }
`;
export default isCurrentUserFollowSchema;
