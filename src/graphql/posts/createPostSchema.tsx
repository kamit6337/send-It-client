import { gql } from "graphql-request";

export const createPostDataQuery = "createPost";

const createPostSchema = gql`
  mutation CreatePost(
    $message: String
    $media: String
    $duration: Int
    $thumbnail: String
  ) {
    createPost(
      message: $message
      media: $media
      duration: $duration
      thumbnail: $thumbnail
    ) {
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
`;

export default createPostSchema;
