import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useSearchParams } from "react-router-dom";
import environment from "@/utils/environment";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import ReactIcons from "@/assets/icons";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MyImages from "@/assets/images";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";

const SignUp = () => {
  const { showErrorMessage } = Toastify();
  const msg = useSearchParams()[0].get("msg");

  useEffect(() => {
    if (msg) {
      showErrorMessage({ message: msg });
    }
  }, []);

  const googleOAuth = () => {
    const url = `${environment.SERVER_URL}/auth/google`;
    const openWindow = window.open(url, "_self");

    if (!openWindow) {
      showErrorMessage({
        message:
          "Error in Google OAuth login. Try login with Email and Password",
      });
    } else {
      openWindow.onerror = () => {
        showErrorMessage({
          message:
            "Error in Google OAuth login. Try login with Email and Password",
        });
      };
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up</title>
        <meta name="discription" content="Sign up page of this project" />
      </Helmet>
      <main className="w-full md:h-screen h-full flex flex-col md:flex-row">
        <p className="md:w-1/2 h-full flex justify-center items-center">
          <ReactIcons.twitterLogo className="text-[250px]" />
        </p>
        <div className="flex-1 p-5 py-20 h-full flex flex-col items-center md:items-stretch">
          <p className="text-7xl font-black mb-10 text-center md:text-start">
            Happening now
          </p>

          <div className="w-96 flex-1 flex flex-col justify-between gap-10 md:gap-0">
            <div className="flex flex-col gap-2 mt-10">
              <p className="text-2xl font-black tracking-wider mb-5">
                Join today.
              </p>
              <button
                className="auth_submit_btn flex justify-center items-center gap-2"
                onClick={googleOAuth}
              >
                <div className="w-7">
                  <img
                    src={MyImages.googleIcon}
                    alt="Google Icon"
                    className="w-full"
                  />
                </div>
                <p>Sign up with Google</p>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-full h-[2px] bg-or_dash" />
                <p>or</p>
                <div className="w-full h-[2px] bg-or_dash" />
              </div>
              <Dialog>
                <DialogTrigger className="w-full">
                  <button className="w-full bg-sky_blue py-3 rounded-full text-white text-center">
                    Create Account
                  </button>
                </DialogTrigger>

                <CreateAccount />
              </Dialog>
            </div>

            <div className="space-y-2">
              <p>Already have an account?</p>
              <Dialog>
                <DialogTrigger className="w-full">
                  <button className="auth_submit_btn">Sign In</button>
                </DialogTrigger>
                <SignIn />
              </Dialog>
            </div>
          </div>
        </div>
      </main>

      <ToastContainer />
    </>
  );
};

export default SignUp;
