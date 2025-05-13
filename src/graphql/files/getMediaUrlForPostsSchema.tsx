import { gql } from "graphql-request";

export const getMediaUrlForPostsDataQuery = "getMediaUrlForPosts";

const getMediaUrlForPostsSchema = gql`
  query GetMediaUrlForPosts($type: MediaType!) {
    getMediaUrlForPosts(type: $type) {
      timestamp
      signature
      apiKey
      folder
      eager
      url
    }
  }
`;

export default getMediaUrlForPostsSchema;
