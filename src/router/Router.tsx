import { Routes, Route } from "react-router-dom";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import VerifySignUp from "@/pages/auth/VerifySignUp";
import Home from "@/pages/home/Home";
import AuthLayout from "@/layout/AuthLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NewPassword from "@/pages/auth/NewPassword";
import VerifyOAuthLogin from "@/pages/auth/VerifyOAuthLogin";
import NotFound from "@/pages/notFound/NotFound";
import SearchBarLayout from "@/layout/SearchBarLayout";
import SinglePost from "@/pages/singlePost/SinglePost";
import UserLayout from "@/layout/UserLayout";
import UserProfileLayout from "@/layout/UserProfileLayout";
import UserPosts from "@/pages/user/UserPosts";
import Likes from "@/pages/user/Likes";
import SavePosts from "@/pages/user/SavePosts";
import Media from "@/pages/user/Media";
import Replies from "@/pages/user/Replies";
import SingleReply from "@/pages/reply/SingleReply";
import FollowerLayout from "@/layout/FollowerLayout";
import Following from "@/pages/followers/Following";
import Followers from "@/pages/followers/Followers";

const Router = () => {
  return (
    <Routes>
      {/* NOTE: AUTH ROUTES */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/verify" element={<VerifySignUp />} />
        <Route path="/oauth" element={<VerifyOAuthLogin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
      </Route>

      {/* NOTE: ROOTLAYOUT */}
      <Route path="/" element={<RootLayout />}>
        {/* NOTE: SEARCHBAR LAYOUT */}
        <Route path="/" element={<SearchBarLayout />}>
          <Route index element={<Home />} />

          {/* NOTE: USER PROFILE */}
          <Route path="posts/:id" element={<SinglePost />} />
          <Route path="reply/:id" element={<SingleReply />} />

          {/* NOTE: USER PROFILE */}
          <Route path="/:email" element={<UserLayout />}>
            <Route path="/:email" element={<UserProfileLayout />}>
              <Route index element={<UserPosts />} />
              <Route path="likes" element={<Likes />} />
              <Route path="replies" element={<Replies />} />
              <Route path="media" element={<Media />} />
              <Route path="save" element={<SavePosts />} />
            </Route>

            {/* NOTE: USER FOLLWING AND FOLLOWER */}
            <Route path="/:email" element={<FollowerLayout />}>
              <Route path="following" element={<Following />} />
              <Route path="follower" element={<Followers />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
