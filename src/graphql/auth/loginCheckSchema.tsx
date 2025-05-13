import { gql } from "graphql-request";

export const getLoginCheckDataQuery = "getLoginCheck";

const loginCheckSchema = gql`
  query GetLoginCheck {
    getLoginCheck {
      _id
      name
      email
      photo
      role
    }
  }
`;

export default loginCheckSchema;
