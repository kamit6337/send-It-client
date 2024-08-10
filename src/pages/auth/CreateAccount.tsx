/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import Toastify from "@/lib/Toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postAuthReq } from "@/utils/api/authApi";
import Loading from "@/lib/Loading";
import { DialogContent } from "@/components/ui/dialog";

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

const CreateAccount = () => {
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
      navigate("/verify");
    } catch (error) {
      console.log("error", error);
      showErrorMessage({
        message:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    }
  };

  return (
    <DialogContent className="sm:w-[576px] w-full p-5">
      <div className="space-y-1 text-center mb-10">
        <p className="text-3xl font-medium ">Sign Up</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <div className="input_div">
            <input
              {...register("name")}
              name="name"
              title="Name"
              placeholder="Name"
              className="input"
            />
          </div>
          {errors.name && <p className="input_error">{errors.name.message}</p>}
        </div>
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
        <div>
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
          {isSubmitting ? <Loading /> : "Create Account"}
        </button>
      </form>
    </DialogContent>
  );
};

export default CreateAccount;
