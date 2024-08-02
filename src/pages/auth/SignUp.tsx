/* eslint-disable @typescript-eslint/no-unused-vars */
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import { Link, useNavigate } from "react-router-dom";
import environment from "@/utils/environment";
import { postAuthReq } from "@/utils/api/authApi";
import { Helmet } from "react-helmet";

const schema = z
  .object({
    name: z.string().min(1, "Name must be provided"),
    email: z.string().min(1, "Email must me provided"),
    password: z.string().min(8, "Password should at least 8 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set the path of the error
  });

const SignUp = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { confirmPassword, ...data } = values;
    try {
      await postAuthReq("/signup", data);
      localStorage.setItem("email", data.email);
      navigate("/signup/verify");
    } catch (error) {
      console.log("error", error);
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
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
        <title>SignUp</title>
        <meta name="discription" content="Sign up page of this project" />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Create Your Account" gap={20}>
          <Input
            name="name"
            title="Name"
            register={register}
            error={errors.name?.message}
          />
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
          <Input
            name="confirmPassword"
            type="password"
            title="Confirm Password"
            register={register}
            error={errors.confirmPassword?.message}
          />
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loading /> : "Create Account"}
          </Button>
          <div className="flex items-center gap-3">
            <p className="text-light_black">Have an Account?</p>
            <button className="font-semibold uppercase tracking-wider">
              <Link to={`/login`}>Login</Link>
            </button>
          </div>
          <div className="btn_google_oauth" onClick={googleOAuth}>
            <div className="">
              Signup with{" "}
              <span className="font-semibold tracking-wider">Google</span>
            </div>
          </div>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUp;
