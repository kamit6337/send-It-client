import ReactIcons from "@/assets/icons";
import EditProfile from "@/components/EditProfile";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import userProfileLinks from "@/data/userProfileLinks";
import { followersQuery } from "@/hooks/useFollowers";
import { followingQuery } from "@/hooks/useFollowing";
import useLoginCheck from "@/hooks/useLoginCheck";
import useUserProfile from "@/hooks/useUserProfile";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { queryClient } from "@/main";
import { userInitialState } from "@/redux/slice/userSlice";
import { User } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import getMonthAndYear from "@/utils/javascript/getMonthAndYear";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserProfileLayout = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { data, refetch: refetchUser } = useUserProfile(username);
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();
  const { data: actualUser, refetch } = useLoginCheck();
  const [currentUser, setCurrentUser] = useState<User>(data.data);
  const { pathname } = useLocation();
  const { userPostsCount, likePostsCount } = useSelector(userInitialState);
  const closeRef = useRef(null);
  const [hideScroll, setHideScroll] = useState(false);

  useEffect(() => {
    setCurrentUser(data.data);
  }, [username, data]);

  const userlinks = useMemo(() => {
    return userProfileLinks(username, actualUser);
  }, [username, actualUser]);

  const info = useMemo(() => {
    if (pathname === `/${currentUser.username}`) {
      return `${userPostsCount} posts`;
    }
    if (pathname === `/${currentUser.username}/likes`) {
      return `${likePostsCount} likes`;
    }
    return "";
  }, [pathname, currentUser, userPostsCount, likePostsCount]);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await postReq("/user/following", { id: currentUser._id });
      setCurrentUser((prev) => {
        prev.followersCount += 1;
        prev.isFollowed = true;
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
      setCurrentUser((prev) => {
        prev.followersCount -= 1;
        prev.isFollowed = false;
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

  const handleClose = () => {
    closeRef.current?.click();
    refetch();
    refetchUser();
  };

  const handleScroll = (bool: boolean) => {
    setHideScroll(bool);
  };

  return (
    <>
      <section className="">
        {/* NOTE: HEADER */}
        <div className="sticky z-20 top-0 py-2 bg-background flex items-center gap-5 px-5 border-b border-div_border">
          <LeftArrowBtn />
          <div>
            <p className="font-semibold tracking-wider">{currentUser.name}</p>
            <p className="text-grey text-sm">{info}</p>
          </div>
        </div>

        <div className="w-full border-b border-border">
          {/* NOTE: BACKGROUND IMAGE */}

          <div className="h-60 w-full bg-gray-100 relative flex justify-center">
            <img src={currentUser.bg_photo} className="h-full object-cover" />
          </div>

          {/* NOTE: PROFILE IMAGE */}
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
              <Dialog>
                <DialogTrigger className="w-max my-5 px-5 py-2 border border-border rounded-full self-end">
                  Edit
                </DialogTrigger>
                <DialogContent
                  className={`${
                    hideScroll ? "overflow-y-hidden" : "overflow-y-auto"
                  } top-[3%] translate-y-0 p-0 max-h-[500px]`}
                >
                  <EditProfile
                    handleClose={handleClose}
                    user={currentUser}
                    handleScroll={handleScroll}
                  />
                  <DialogClose ref={closeRef} asChild className="hidden">
                    <button>Close</button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            ) : currentUser.isFollowed ? (
              <button
                disabled={isLoading}
                className="w-max my-5 self-end following"
                onClick={handleCancelFollow}
              >
                {isLoading ? <Loading /> : "Following"}
              </button>
            ) : (
              <button
                disabled={isLoading}
                className="w-max my-5 self-end follow"
                onClick={handleFollow}
              >
                {isLoading ? <Loading /> : "Follow"}
              </button>
            )}

            {/* NOTE: USER INFO (NAME, USERNAME, BIO, LOCATION, WEBSITE) */}
            <div className="space-y-3">
              <div className="">
                <p className="text-xl font-semibold tracking-wider">
                  {currentUser.name}
                </p>
                <p className="text-grey text-sm">@{currentUser.username}</p>
              </div>
              <p>{currentUser.bio}</p>

              <div className="flex flex-wrap gap-5 text-sm text-grey">
                {currentUser.location && (
                  <div className="flex items-center gap-1">
                    <p>
                      <ReactIcons.location />
                    </p>
                    <p>{currentUser.location}</p>
                  </div>
                )}
                {currentUser.website && (
                  <div className="flex items-center gap-1">
                    <p>
                      <ReactIcons.globe />
                    </p>
                    <a href={currentUser.website} target="_blank">
                      {currentUser.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <p>
                    <ReactIcons.calender />
                  </p>
                  <p>Joined {getMonthAndYear(currentUser.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* NOTE: USER INFO (FOLLOWERS AND FOLLOWINGS) */}
            <div className="flex items-center gap-4 text-sm my-5">
              <Link
                to={`/${username}/following`}
                onMouseEnter={async () =>
                  await queryClient.prefetchQuery(
                    followingQuery(currentUser._id)
                  )
                }
                className="hover:border-b border-div_border h-5"
              >
                {currentUser.followingCount}{" "}
                <span className="text-grey">Following</span>
              </Link>
              <Link
                to={`/${username}/follower`}
                onMouseEnter={async () =>
                  await queryClient.prefetchQuery(
                    followersQuery(currentUser._id)
                  )
                }
                className="hover:border-b border-div_border h-5"
              >
                {currentUser.followersCount}{" "}
                <span className="text-grey">Followers</span>
              </Link>
            </div>

            {/* NOTE: POSTS, REPLIES, MEDIA, SAVED, SHARE */}
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
