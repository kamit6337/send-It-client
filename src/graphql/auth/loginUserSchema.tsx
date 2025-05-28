import { gql } from "graphql-request";

export const loginUserDataQuery = "loginUser";

const loginUserSchema = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password)
  }
`;

export default loginUserSchema;
