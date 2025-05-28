import { gql } from "graphql-request";

export const signUpUserFinalDataQuery = "signUpUserFinal";

const signUpUserFinalSchema = gql`
  mutation SignUpUserFinal($otp: String, $email: String) {
    signUpUserFinal(otp: $otp, email: $email)
  }
`;

export default signUpUserFinalSchema;
