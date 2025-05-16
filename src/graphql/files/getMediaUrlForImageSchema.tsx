import { gql } from "graphql-request";

export const getMediaUrlForImageDataQuery = "getMediaUrlForImage";

const getMediaUrlForImageSchema = gql`
  query GetMediaUrlForImage($folder: FOLDER!) {
    getMediaUrlForImage(folder: $folder) {
      timestamp
      signature
      apiKey
      folder
      eager
      url
    }
  }
`;

export default getMediaUrlForImageSchema;
