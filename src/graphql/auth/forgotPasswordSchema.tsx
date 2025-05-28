import { gql } from "graphql-request";

export const forgotPasswordDataQuery = "forgotPassword";

const forgotPasswordSchema = gql`
  mutation ForgotPassword($email: String) {
    forgotPassword(email: $email)
  }
`;

export default forgotPasswordSchema;
