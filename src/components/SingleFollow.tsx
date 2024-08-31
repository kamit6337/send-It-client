import useLoginCheck from "@/hooks/useLoginCheck";
import { ToastContainer } from "@/lib/Toastify";
import { followingState } from "@/redux/slice/followingSlice";
import { Follower } from "@/types";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserFollowAndUnfollow from "./UserFollowAndUnfollow";

type Props = {
  follow: Follower;
  isFollower: boolean;
};

const SingleFollow = ({ follow, isFollower }: Props) => {
  const { isActualUserFollow, follower, user } = follow;
  const { followings } = useSelector(followingState);
  const { data: actualUser } = useLoginCheck();

  const _id = isFollower ? follower._id : user._id;
  const username = isFollower ? follower.username : user.username;
  const name = isFollower ? follower.name : user.name;
  const photo = isFollower ? follower.photo : user.photo;

  const isFollowed = useMemo(() => {
    if (followings.length === 0) return isActualUserFollow;
    const findFollowing = followings.find((obj) => obj._id === _id);
    if (!findFollowing) return isActualUserFollow;
    return findFollowing.isActualUserFollow;
  }, [followings, isActualUserFollow, _id]);

  const userObj = {
    _id,
    name,
    username,
    photo,
  };

  return (
    <>
      <div className="w-full px-10 py-3 flex justify-between items-center hover:bg-sidebar_link_hover border-b border-div_border">
        <Link to={`/${username}`} className="flex items-center gap-3">
          <div className="w-10 md:w-12">
            <img src={photo} alt={name} className="w-full rounded-full" />
          </div>
          <div>
            <p>{name}</p>
            <p className="username">@{username}</p>
          </div>
        </Link>
        <UserFollowAndUnfollow
          actualUser={actualUser}
          currentUser={userObj}
          isFollowed={isFollowed}
          showEdit={false}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default SingleFollow;
