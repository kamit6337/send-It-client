import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@/components/custom/Box";
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
        navigate("/signup");
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
          <div className="w-full">
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
          <button disabled={isSubmitting} className="auth_submit_btn">
            {isSubmitting ? <Loading /> : "Submit"}
          </button>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
