import { gql } from "graphql-request";

export const signUpUserInitialDataQuery = "signUpUserInitial";

const signUpUserInitialSchema = gql`
  mutation SignUpUserInitial($name: String, $email: String, $password: String) {
    signUpUserInitial(name: $name, email: $email, password: $password)
  }
`;

export default signUpUserInitialSchema;
