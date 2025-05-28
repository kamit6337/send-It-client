import { gql } from "graphql-request";

export const newPasswordDataQuery = "newPassword";

const newPasswordSchema = gql`
  mutation NewPassword($resetToken: String, $password: String) {
    newPassword(resetToken: $resetToken, password: $password)
  }
`;

export default newPasswordSchema;
