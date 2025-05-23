import { gql } from "graphql-request";

export const createPostReplyDataQuery = "createPostReply";

const createPostReplySchema = gql`
  mutation CreatePostReply(
    $postId: ID!
    $message: String
    $media: String
    $duration: Int
    $thumbnail: String
  ) {
    createPostReply(
      postId: $postId
      message: $message
      media: $media
      duration: $duration
      thumbnail: $thumbnail
    )
  }
`;

export default createPostReplySchema;
