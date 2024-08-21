import FollowerLayout from "@/layout/FollowerLayout";
import MessagesLayout from "@/layout/MessagesLayout";
import RootLayout from "@/layout/RootLayout";
import SearchBarLayout from "@/layout/SearchBarLayout";
import UserLayout from "@/layout/UserLayout";
import UserProfileLayout from "@/layout/UserProfileLayout";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NewPassword from "@/pages/auth/NewPassword";
import SignUp from "@/pages/auth/SignUp";
import UserName from "@/pages/auth/UserName";
import VerifySignUp from "@/pages/auth/VerifySignUp";
import Chats from "@/pages/chats/Chats";
import Followers from "@/pages/followers/Followers";
import Following from "@/pages/followers/Following";
import Home from "@/pages/home/Home";
import Messages from "@/pages/messages/Messages";
import SinglePost from "@/pages/post/SinglePost";
import SingleReply from "@/pages/reply/SingleReply";
import Likes from "@/pages/user/Likes";
import Media from "@/pages/user/Media";
import Replies from "@/pages/user/Replies";
import SavePosts from "@/pages/user/SavePosts";
import UserPosts from "@/pages/user/UserPosts";
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
        <Route path="messages" element={<MessagesLayout />}>
          <Route index element={<Messages />} />
          <Route path=":id" element={<Chats />} />
        </Route>
        <Route path="/" element={<SearchBarLayout />}>
          <Route index element={<Home />} />

          {/* NOTE: USER PROFILE */}
          <Route path="posts/:id" element={<SinglePost />} />
          <Route path="reply/:id" element={<SingleReply />} />

          {/* NOTE: USER PROFILE */}
          <Route path="/:username" element={<UserLayout />}>
            <Route path="/:username" element={<UserProfileLayout />}>
              <Route index element={<UserPosts />} />
              <Route path="likes" element={<Likes />} />
              <Route path="replies" element={<Replies />} />
              <Route path="media" element={<Media />} />
              <Route path="save" element={<SavePosts />} />
            </Route>

            {/* NOTE: USER FOLLWING AND FOLLOWER */}
            <Route path=":username" element={<FollowerLayout />}>
              <Route path="following" element={<Following />} />
              <Route path="follower" element={<Followers />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
