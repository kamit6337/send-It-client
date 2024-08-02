import RootLayout from "@/layout/RootLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";
import NewPassword from "@/pages/auth/NewPassword";
import SignUp from "@/pages/auth/SignUp";
import VerifySignUp from "@/pages/auth/VerifySignUp";
import Home from "@/pages/home/Home";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      {/* NOTE: AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/verify" element={<VerifySignUp />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/newPassword" element={<NewPassword />} />

      {/* NOTE: ROOTLAYOUT */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Router;
