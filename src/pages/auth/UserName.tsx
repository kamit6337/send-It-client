import Box from "@/components/custom/Box";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { patchReq } from "@/utils/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Email must me provided"),
});

const UserName = () => {
  const navigate = useNavigate();
  const { showErrorMessage, showSuccessMessage } = Toastify();
  const userName = useSearchParams()[0].get("username") as string;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userName,
    },
  });

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  useEffect(() => {
    if (userName) {
      reset({
        username: userName,
      });
    }
  }, [userName, reset]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const response = await patchReq("/user", values);
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

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>User Profile</title>
        <meta
          name="discription"
          content="Forgot Password page of this project"
        />
      </Helmet>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          title="User Profile"
          gap={30}
          cancelBtn={true}
          handleCancel={handleCancel}
        >
          <div className="w-full">
            <div className="input_div">
              <input
                {...register("username")}
                name="email"
                type="email"
                placeholder="Email"
                className="input"
              />
            </div>
            {errors.username && (
              <p className="input_error">{errors.username.message}</p>
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

export default UserName;
