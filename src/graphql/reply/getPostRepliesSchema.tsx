import { gql } from "graphql-request";

export const getPostRepliesDataQuery = "getPostReplies";

const getPostRepliesSchema = gql`
  query GetPostReplies($postId: ID!, $page: Int!) {
    getPostReplies(postId: $postId, page: $page) {
      _id
      user {
        _id
        name
        email
        photo
      }
      message
      media
      createdAt
      updatedAt
    }
  }
`;

export default getPostRepliesSchema;
