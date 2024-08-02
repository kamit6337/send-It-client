import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
import Input from "@/components/custom/Input";
import { Button } from "@/components/ui/button";
import Loading from "@/lib/Loading";
import { useNavigate } from "react-router-dom";
import { postAuthReq } from "@/utils/api/authApi";
import { Helmet } from "react-helmet";

const schema = z.object({
  email: z.string().min(1, "Email must me provided"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showErrorMessage, showSuccessMessage } = Toastify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await postAuthReq("/forgot", values);
      showSuccessMessage({ message: response.message });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="discription"
          content="Forgot Password page of this project"
        />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Forgot Password" gap={30}>
          <Input
            name="email"
            type="email"
            title="Email"
            register={register}
            error={errors.email?.message}
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

export default ForgotPassword;
