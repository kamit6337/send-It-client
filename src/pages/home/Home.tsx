import useLoginCheck from "@/hooks/useLoginCheck";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Post from "./Post";

const Home = () => {
  const { showSuccessMessage } = Toastify();
  const { state } = useLocation();
  const msg = useSearchParams()[0].get("msg");
  const { data: user } = useLoginCheck();

  useEffect(() => {
    if (msg || state?.msg) {
      showSuccessMessage({ message: msg || state?.msg });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of this project" />
      </Helmet>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <Post />
        <p>Home Page</p>

        <Link to={`/login`}>Login</Link>
        <Link to={`/signup`}>Sign Up</Link>
        <Link to={`/signup/verify`}>Sign Up Verify</Link>
        <Link to={`/forgot`}>Forgot Password</Link>
        <Link to={`/newPassword`}>New Password</Link>
      </div>
    </>
  );
};

export default Home;
