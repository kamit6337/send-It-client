/* eslint-disable @typescript-eslint/no-unused-vars */
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
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
        navigate("/login");
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
            {isSubmitting ? <Loading /> : "Submit"}
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default NewPassword;
