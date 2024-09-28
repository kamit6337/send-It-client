import Box from "@/components/custom/Box";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useState } from "react";
import OtpInput from "./OtpInput";
import modifyEmail from "@/utils/javascript/modifyEmail";
import { useNavigate } from "react-router-dom";
import { postAuthReq } from "@/utils/api/authApi";
import { Helmet } from "react-helmet";

const VerifySignUp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(new Array(8).fill(""));
  const email = localStorage.getItem("email") || "example@gmail.com";
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage, showSuccessMessage } = Toastify();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const modifyOtp = otp.join("");
      const response = await postAuthReq("/signup/verify", { otp: modifyOtp });
      navigate(`/flow?username=${response.data}`);
      localStorage.removeItem("email");
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await postAuthReq("/signup/resendOtp");
      showSuccessMessage({
        message: response.message,
      });
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify</title>
        <meta name="discription" content="Signup Verify page of this project" />
      </Helmet>
      <Box title="Verify your email">
        <div className="text-center">
          <p>Enter the 8 digit code you have received on</p>
          <p className="font-medium">{email ? modifyEmail(email) : ""}</p>
        </div>
        <OtpInput otp={otp} cb={(value: string[]) => setOtp(value)} />
        <div className="w-full mt-12 flex flex-col gap-2">
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="auth_submit_btn"
          >
            {isLoading ? <Loading /> : "Verify"}
          </button>
          <button
            type="button"
            className="self-end text-sm text-sky_blue mr-2"
            onClick={handleResendOtp}
          >
            Resend OTP
          </button>
        </div>
      </Box>
      <ToastContainer />
    </>
  );
};

export default VerifySignUp;
