import { gql } from "graphql-request";

export const resendOtpDataQuery = "resendOtp";

const resendOtpSchema = gql`
  mutation ResendOtp($email: String) {
    resendOtp(email: $email)
  }
`;

export default resendOtpSchema;
