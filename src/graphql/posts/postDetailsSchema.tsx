import { gql } from "graphql-request";

export const getPostDetailsDataQuery = "getPostDetails";

const postDetailsSchema = gql`
  query GetPostDetails($id: ID!) {
    getPostDetails(id: $id) {
      _id
      user {
        _id
      }
      replyCount
      likeCount
      viewCount
      saveCount
      retweetCount
      isFollow
      isLiked
      isSaved
    }
  }
`;

export default postDetailsSchema;
