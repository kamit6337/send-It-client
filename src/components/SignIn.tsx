import Loading from "@/lib/Loading";
import { DialogContent } from "./ui/dialog";
import environment from "@/utils/environment";
import { postAuthReq } from "@/utils/api/authApi";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Toastify from "@/lib/Toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import MyImages from "@/assets/images";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, "Email must me provided"),
  password: z.string().min(8, "Password should at least 8 character"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();

  const msg = useSearchParams()[0].get("msg");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (msg) {
      showErrorMessage({ message: msg });
    }
  }, []);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await postAuthReq("/login", values);
      navigate("/", { state: { msg: "Successfully logged in" } });
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

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
      <DialogContent className="sm:w-[576px] w-full">
        <div className="space-y-1 text-center">
          <p className="text-3xl font-medium mb-10">Login</p>
        </div>

        <button
          className="w-full bg-foreground py-[10px] rounded-full text-background flex justify-center items-center gap-2"
          onClick={googleOAuth}
        >
          <div className="w-7">
            <img
              src={MyImages.googleIcon}
              alt="Google Icon"
              className="w-full"
            />
          </div>
          <p>Login with Google</p>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-full h-[2px] bg-search_bg" />
          <p>or</p>
          <div className="w-full h-[2px] bg-search_bg" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <div className="input_div">
              <input
                {...register("email")}
                name="email"
                type="email"
                placeholder="Email"
                className="input"
              />
            </div>
            {errors.email && (
              <p className="input_error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div className="input_div">
              <input
                {...register("password")}
                name="password"
                type="password"
                placeholder="Password"
                className="input"
              />
            </div>
            {errors.password && (
              <p className="input_error">{errors.password.message}</p>
            )}
          </div>
          <button disabled={isSubmitting} className="auth_submit_btn">
            {isSubmitting ? <Loading /> : "Login"}
          </button>
          <div className="text-end text-sm text-sky_blue mr-2">
            <Link to={`/forgot`}>Forgot Password</Link>
          </div>
        </form>
      </DialogContent>
    </>
  );
};

export default SignIn;
