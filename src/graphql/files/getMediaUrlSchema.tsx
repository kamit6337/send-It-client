import { gql } from "graphql-request";

export const getMediaUrlDataQuery = "getMediaUrl";

const getMediaUrlSchema = gql`
  query GetMediaUrl($folder: FOLDER!) {
    getMediaUrl(folder: $folder) {
      timestamp
      signature
      apiKey
      folder
      eager
      url
    }
  }
`;

export default getMediaUrlSchema;
