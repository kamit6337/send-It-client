import Box from "@/components/custom/Box";
import { Button } from "@/components/ui/button";
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
  const { showErrorMessage } = Toastify();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const modifyOtp = otp.join("");
      await postAuthReq("/signup/verify", { otp: modifyOtp });
      localStorage.removeItem("email");
      navigate("/", { state: { msg: "Successfully Signup" } });
    } catch (error) {
      showErrorMessage({
        message: "Something went wrong. Please try later",
      });
    } finally {
      setIsLoading(false);
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
        <Button
          disabled={isLoading}
          onClick={handleSubmit}
          className="w-full mt-12"
        >
          {isLoading ? <Loading /> : "Verify"}
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default VerifySignUp;
