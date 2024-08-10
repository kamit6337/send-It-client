/* eslint-disable @typescript-eslint/no-unused-vars */
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Loading from "@/lib/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { postAuthReq } from "@/utils/api/authApi";
import { Helmet } from "react-helmet";

const schema = z
  .object({
    password: z.string().min(8, "Password should at least 8 character"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Set the path of the error
  });

const NewPassword = () => {
  const navigate = useNavigate();
  const { showErrorMessage, showSuccessMessage } = Toastify();

  const token = useSearchParams()[0].get("token");
  const email = useSearchParams()[0].get("email");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const { confirmPassword, ...rest } = values;

    const data = { ...rest, email, token };

    try {
      const response = await postAuthReq("/newPassword", data);
      showSuccessMessage({ message: response.message });
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    } catch (error) {
      console.log("error", error);
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>New Password</title>
        <meta name="discription" content="New Password page of this project" />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Create New Password" gap={30}>
          <div className="w-full">
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
          <div className="w-full">
            <div className="input_div">
              <input
                {...register("confirmPassword")}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="input"
              />
            </div>
            {errors.confirmPassword && (
              <p className="input_error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button disabled={isSubmitting} className="auth_submit_btn">
            {isSubmitting ? <Loading /> : "Submit"}
          </button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default NewPassword;
