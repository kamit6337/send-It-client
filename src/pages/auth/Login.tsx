import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { postAuthReq } from "@/utils/api/authApi";
import environment from "@/utils/environment";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

const schema = z.object({
  email: z.string().min(1, "Email must me provided"),
  password: z.string().min(8, "Password should at least 6 character"),
});

const Login = () => {
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
      <Helmet>
        <title>Login</title>
        <meta name="discription" content="Login page of this project" />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Login" gap={30}>
          <div className="space-y-1 text-center">
            <p className="text-2xl font-medium">Welcome back to ECOMMERCE</p>
            <p>The next gen business marketplace</p>
          </div>
          <Input
            name="email"
            type="email"
            title="Email"
            register={register}
            error={errors.email?.message}
          />
          <Input
            name="password"
            type="password"
            title="Password"
            register={register}
            error={errors.password?.message}
          />
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loading /> : "Login"}
          </Button>
          <div className="flex items-center gap-3">
            <p className="text-light_black">Don’t have an Account?</p>
            <button className="font-semibold uppercase tracking-wider">
              <Link to={"/signup"}>Sign Up</Link>
            </button>
          </div>
          <div className="btn_google_oauth" onClick={googleOAuth}>
            <div className="">
              Login with{" "}
              <span className="font-semibold tracking-wider">Google</span>
            </div>
          </div>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
