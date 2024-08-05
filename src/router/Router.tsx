import FollowerLayout from "@/layout/FollowerLayout";
import RootLayout from "@/layout/RootLayout";
import UserLayout from "@/layout/UserLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NewPassword from "@/pages/auth/NewPassword";
import SignUp from "@/pages/auth/SignUp";
import UserName from "@/pages/auth/UserName";
import VerifySignUp from "@/pages/auth/VerifySignUp";
import Followers from "@/pages/followers/Followers";
import Following from "@/pages/followers/Following";
import Home from "@/pages/home/Home";
import Post from "@/pages/home/Post";
import Likes from "@/pages/user/Likes";
import Profile from "@/pages/user/Profile";
import Replies from "@/pages/user/Replies";
import { Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      {/* NOTE: AUTH ROUTES */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/flow" element={<UserName />} />
      <Route path="/verify" element={<VerifySignUp />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/newPassword" element={<NewPassword />} />

      {/* NOTE: ROOTLAYOUT */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />

        {/* NOTE: USER PROFILE */}
        <Route path="posts/:id" element={<Post />} />

        {/* NOTE: USER PROFILE */}
        <Route path="/:username" element={<UserLayout />}>
          <Route index element={<Profile />} />
          <Route path="likes" element={<Likes />} />
          <Route path="replies" element={<Replies />} />
        </Route>

        {/* NOTE: USER FOLLWING AND FOLLOWER */}
        <Route path="/" element={<FollowerLayout />}>
          <Route path="following" element={<Following />} />
          <Route path="followers" element={<Followers />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
