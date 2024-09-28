import useLoginCheck from "@/hooks/useLoginCheck";
import useUserProfile from "@/hooks/useUserProfile";
import UserFollowAndUnfollow from "./UserFollowAndUnfollow";
import { useSelector } from "react-redux";
import { followingState } from "@/redux/slice/followingSlice";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const HoveredUserInfo = ({ username }: { username: string }) => {
  const { data, isLoading, error } = useUserProfile(username);
  const { data: actualUser } = useLoginCheck();
  const { followings } = useSelector(followingState);

  const isFollowed = useMemo(() => {
    if (!data) return false;
    if (followings.length === 0) return data.isFollowed;
    const findFollowing = followings.find((obj) => obj._id === data._id);
    if (!findFollowing) return data.isFollowed;
    return findFollowing.isActualUserFollow;
  }, [followings, data]);

  if (isLoading || error) return null;

  const { name, photo, followingCount, followersCount } = data;

  return (
    <div className="absolute z-20 top-full left-1/2 -translate-x-1/2 w-80 bg-background border border-div_border rounded-xl p-5 cursor-default space-y-10">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <div className="w-20">
            <Link to={`/${username}`}>
              <img
                src={photo}
                alt={name}
                className="w-full object-cover rounded-full"
              />
            </Link>
          </div>
          <UserFollowAndUnfollow
            actualUser={actualUser}
            currentUser={data}
            isFollowed={isFollowed}
            showEdit={false}
          />
        </div>
        <div>
          <Link
            to={`/${username}`}
            className="font-semibold text-user_name text-lg hover:underline underline-offset-4"
          >
            <p>{name}</p>
          </Link>
          <p className="text-grey text-xs tracking-wide">@{username}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
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
    </div>
  );
};

export default HoveredUserInfo;
