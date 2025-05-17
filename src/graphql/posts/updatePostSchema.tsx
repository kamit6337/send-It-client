import { gql } from "graphql-request";

export const updatePostDataQuery = "updatePost";

const updatePostSchema = gql`
  mutation UpdatePost(
    $id: ID!
    $message: String
    $media: String
    $duration: Int
    $thumbnail: String
  ) {
    updatePost(
      id: $id
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

export default updatePostSchema;
