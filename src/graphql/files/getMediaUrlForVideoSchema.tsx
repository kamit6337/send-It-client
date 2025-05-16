import { gql } from "graphql-request";

export const getMediaUrlForVideoDataQuery = "getMediaUrlForVideo";

const getMediaUrlForVideoSchema = gql`
  query GetMediaUrlForVideo($folder: FOLDER!) {
    getMediaUrlForVideo(folder: $folder) {
      timestamp
      signature
      apiKey
      folder
      eager
      url
    }
  }
`;

export default getMediaUrlForVideoSchema;
