import { gql } from "graphql-request";

export const getSingleReplyDataQuery = "getSingleReply";

const getSingleReplySchema = gql`
  query GetSingleReply($postId: ID!) {
    getSingleReply(postId: $postId) {
      _id
      message
      media
      createdAt
      updatedAt
      user {
        _id
        name
        email
        photo
      }
      replyPostId {
        _id
        message
        media
        createdAt
        updatedAt
        user {
          _id
          name
          email
          photo
        }
      }
    }
  }
`;

export default getSingleReplySchema;
