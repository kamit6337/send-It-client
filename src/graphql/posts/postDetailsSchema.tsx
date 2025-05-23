import { gql } from "graphql-request";

export const getPostDetailsDataQuery = "getPostDetails";

const postDetailsSchema = gql`
  query GetPostDetails($id: ID!) {
    getPostDetails(id: $id) {
      _id
      post
      replyCount
      likeCount
      viewCount
      saveCount
      retweetCount
      isLiked
      isSaved
    }
  }
`;

export default postDetailsSchema;
