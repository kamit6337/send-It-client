import { gql } from "graphql-request";

export const getPostRepliesDataQuery = "getPostReplies";

const getPostRepliesSchema = gql`
  query GetPostReplies($postId: ID!, $page: Int!) {
    getPostReplies(postId: $postId, page: $page) {
      _id
      message
      media
      createdAt
      updatedAt
      replyPostId
      user {
        _id
        name
        email
        photo
      }
    }
  }
`;

export default getPostRepliesSchema;
