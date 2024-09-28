import ReactIcons from "@/assets/icons";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import UserFollowAndUnfollow from "@/components/UserFollowAndUnfollow";
import userProfileLinks from "@/data/userProfileLinks";
import useLoginCheck from "@/hooks/useLoginCheck";
import { followingState } from "@/redux/slice/followingSlice";
import { OutletContext } from "@/types";
import getMonthAndYear from "@/utils/javascript/getMonthAndYear";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { NavLink, Outlet } from "react-router-dom";

const UserProfileLayout = () => {
  const { user: currentUser } = useOutletContext<OutletContext>();
  const { data: actualUser } = useLoginCheck();
  const { pathname } = useLocation();
  const { followings } = useSelector(followingState);

  const {
    _id,
    name,
    username,
    photo,
    bg_photo,
    bio,
    createdAt,
    followersCount,
    followingCount,
    isFollowed: isActualUserFollow,
    location,
    website,
    userPosts,
    likePosts,
    replyPosts,
    mediaPosts,
    savePosts,
  } = currentUser;

  const isFollowed = useMemo(() => {
    if (followings.length === 0) return isActualUserFollow;
    const findFollowing = followings.find((obj) => obj._id === _id);
    if (!findFollowing) return isActualUserFollow;
    return findFollowing.isActualUserFollow;
  }, [followings, isActualUserFollow, _id]);

  const userlinks = useMemo(() => {
    return userProfileLinks(username, actualUser);
  }, [username, actualUser]);

  const info = useMemo(() => {
    if (pathname === `/${username}`) {
      return `${userPosts} posts`;
    }
    if (pathname === `/${username}/likes`) {
      return `${likePosts} likes`;
    }

    if (pathname === `/${username}/replies`) {
      return `${replyPosts} replies`;
    }
    if (pathname === `/${username}/media`) {
      return `${mediaPosts} media`;
    }
    if (pathname === `/${username}/save`) {
      return `${savePosts} saves`;
    }

    return "";
  }, [
    pathname,
    username,
    userPosts,
    likePosts,
    replyPosts,
    mediaPosts,
    savePosts,
  ]);

  return (
    <>
      <section className="">
        {/* NOTE: HEADER */}
        <div className="sticky z-20 top-0 py-2 bg-background flex items-center gap-5 px-5 border-b border-div_border">
          <LeftArrowBtn />
          <div>
            <p className="font-semibold tracking-wider">{name}</p>
            <p className="text-grey text-sm">{info}</p>
          </div>
        </div>

        <div className="w-full border-b border-border">
          {/* NOTE: BACKGROUND IMAGE */}

          <div className="h-60 w-full bg-gray-200 relative flex justify-center">
            {bg_photo && (
              <img src={bg_photo} className="h-full w-full object-cover" />
            )}
          </div>

          {/* NOTE: PROFILE IMAGE */}
          <div className="w-full relative">
            <div className="absolute z-10 top-1/2 -translate-y-1/2 left-0 w-36 rounded-full p-1 bg-background ml-5">
              <img src={photo} className="w-full object-cover rounded-full" />
            </div>
          </div>
          <div className="px-5 flex flex-col">
            <div className="my-5 self-end">
              <UserFollowAndUnfollow
                actualUser={actualUser}
                currentUser={currentUser}
                isFollowed={isFollowed}
              />
            </div>

            {/* NOTE: USER INFO (NAME, USERNAME, BIO, LOCATION, WEBSITE) */}
            <div className="space-y-3">
              <div className="">
                <p className="text-xl font-semibold tracking-wider">{name}</p>
                <p className="text-grey text-sm">@{username}</p>
              </div>
              <p>{bio}</p>

              <div className="flex flex-wrap gap-y-2 gap-5 text-sm text-grey">
                {location && (
                  <div className="flex items-center gap-1">
                    <p>
                      <ReactIcons.location />
                    </p>
                    <p>{location}</p>
                  </div>
                )}
                {website && (
                  <div className="flex items-center gap-1">
                    <p>
                      <ReactIcons.globe />
                    </p>
                    <a href={website} target="_blank">
                      {website}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <p>
                    <ReactIcons.calender />
                  </p>
                  <p>Joined {getMonthAndYear(createdAt)}</p>
                </div>
              </div>
            </div>

            {/* NOTE: USER INFO (FOLLOWERS AND FOLLOWINGS) */}
            <div className="flex items-center gap-4 text-sm my-5">
              <Link
                to={`/${username}/following`}
                className="hover:border-b border-div_border h-5"
              >
                {followingCount} <span className="text-grey">Following</span>
              </Link>
              <Link
                to={`/${username}/follower`}
                className="hover:border-b border-div_border h-5"
              >
                {followersCount} <span className="text-grey">Followers</span>
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
    </>
  );
};

export default UserProfileLayout;
