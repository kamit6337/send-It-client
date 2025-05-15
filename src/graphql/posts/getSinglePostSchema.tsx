import { gql } from "graphql-request";

export const getSinglePostDataQuery = "getSinglePost";

const getSinglePostSchema = gql`
  query GetSinglePost($id: ID!) {
    getSinglePost(id: $id) {
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

export default getSinglePostSchema;
