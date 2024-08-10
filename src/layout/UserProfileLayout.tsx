import userProfileLinks from "@/data/userProfileLinks";
import useUserProfile from "@/hooks/useUserProfile";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import {
  addFollowing,
  removeFollowing,
  userInitialState,
} from "@/redux/slice/userSlice";
import { deleteReq, postReq } from "@/utils/api/api";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import { useOutletContext, useParams } from "react-router-dom";

const UserProfileLayout = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { data } = useUserProfile(username);
  const { actualUser } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();
  const { removeFollowings, addFollowings } = useSelector(userInitialState);
  const [currentUser, setCurrentUser] = useState(data.data);

  const userlinks = useMemo(() => {
    return userProfileLinks(username, actualUser);
  }, [username, actualUser]);

  useEffect(() => {
    if (currentUser.isFollowed) {
      dispatch(addFollowing(currentUser._id));
    } else {
      dispatch(removeFollowing(currentUser._id));
    }
  }, [currentUser.isFollowed, dispatch, currentUser._id]);

  const isFollowed = useMemo(() => {
    const remove = removeFollowings.find((id) => id === currentUser._id);
    if (remove) {
      return false;
    }

    const add = addFollowings.find((id) => id === currentUser._id);
    if (add) {
      return true;
    }

    return false;
  }, [addFollowings, removeFollowings, currentUser._id]);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await postReq("/user/following", { id: currentUser._id });
      dispatch(addFollowing(currentUser._id));
      setCurrentUser((prev) => {
        prev.followersCount += 1;
        return prev;
      });
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelFollow = async () => {
    try {
      setIsLoading(true);
      await deleteReq("/user/following", { id: currentUser._id });
      dispatch(removeFollowing(currentUser._id));
      setCurrentUser((prev) => {
        prev.followersCount -= 1;
        return prev;
      });
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isItActualUser = actualUser._id === currentUser._id;

  return (
    <>
      <section className="">
        <div className="sticky z-20 top-0 py-2 bg-background flex flex-col px-5 border-b border-div_border">
          <p className="text-xl font-semibold tracking-wider">
            {currentUser.name}
          </p>
          <p className="text-grey text-sm">{currentUser.postCount} posts</p>
        </div>

        <div className="w-full border-b border-border">
          <div className="h-60 w-full bg-gray-100 relative"></div>
          <div className="w-full relative">
            <div className="absolute z-10 top-1/2 -translate-y-1/2 left-0 w-36 rounded-full p-1 bg-background ml-5">
              <img
                src={currentUser.photo}
                className="w-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="px-5 flex flex-col">
            {isItActualUser ? (
              <button className="w-max my-5 px-5 py-2 border border-border rounded-full self-end">
                Edit
              </button>
            ) : isFollowed ? (
              <button
                disabled={isLoading}
                className="w-max my-5 px-5 py-2 border border-border rounded-full self-end"
                onClick={handleCancelFollow}
              >
                {isLoading ? <Loading /> : "Following"}
              </button>
            ) : (
              <button
                disabled={isLoading}
                className="w-max my-5 px-5 py-2 border border-border rounded-full self-end bg-foreground text-background"
                onClick={handleFollow}
              >
                {isLoading ? <Loading /> : "Follow"}
              </button>
            )}
            <div className="mt-5">
              <p className="text-xl font-semibold tracking-wider">
                {currentUser.name}
              </p>
              <p className="text-grey text-sm">@{currentUser.username}</p>
            </div>

            <div className="flex items-center gap-4 text-sm my-5">
              <Link
                to={`/${username}/following`}
                className="hover:border-b border-div_border h-5"
              >
                {currentUser.followingCount}{" "}
                <span className="text-grey">Following</span>
              </Link>
              <Link
                to={`/${username}/follower`}
                className="hover:border-b border-div_border h-5"
              >
                {currentUser.followersCount}{" "}
                <span className="text-grey">Followers</span>
              </Link>
            </div>

            <div className="flex justify-between ">
              {userlinks.map((obj, i) => {
                const { name, href } = obj;

                return (
                  <NavLink
                    to={href}
                    key={i}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold border-b-4 border-blue-400 tracking-wider px-2 py-2"
                        : "px-2 tracking-wider py-2"
                    }
                  >
                    {name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
        <Outlet context={{ user: currentUser, actualUser }} />
      </section>
      <ToastContainer />
    </>
  );
};

export default UserProfileLayout;
