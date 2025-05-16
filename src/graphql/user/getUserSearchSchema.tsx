import { gql } from "graphql-request";

export const getUserSearchDataQuery = "getUserSearch";

const getUserSearchSchema = gql`
  query GetUserSearch($search: String!) {
    getUserSearch(search: $search) {
      _id
      name
      email
      photo
    }
  }
`;

export default getUserSearchSchema;
