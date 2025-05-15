import { gql } from "graphql-request";

export const createPostReplyDataQuery = "createPostReply";

const createPostReplySchema = gql`
  mutation CreatePostReply($postId: ID!, $message: String, $media: String) {
    createPostReply(postId: $postId, message: $message, media: $media) {
      _id
      message
      media
      replyPostId
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
`;

export default createPostReplySchema;
