import useLoginCheck from "@/hooks/useLoginCheck";
import { userProfileQuery } from "@/hooks/useUserProfile";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { queryClient } from "@/main";
import { Follower } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  follow: Follower;
  isFollower?: boolean;
};

const SingleFollow = ({ follow, isFollower = false }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();
  const { isActualUserFollow, follower, user } = follow;
  const [isFollowed, setIsFollowed] = useState(isActualUserFollow);
  const { data: actualUser } = useLoginCheck();

  const _id = isFollower ? follower._id : user._id;
  const username = isFollower ? follower.username : user.username;
  const name = isFollower ? follower.name : user.name;
  const photo = isFollower ? follower.photo : user.photo;
  const isItActualUser = actualUser._id === _id;

  useEffect(() => {
    setIsFollowed(isActualUserFollow);
  }, [isActualUserFollow]);

  const handleFollow = async () => {
    try {
      if (isItActualUser) return;
      setIsLoading(true);
      await postReq("/user/following", { id: _id });
      setIsFollowed(true);
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
      if (isItActualUser) return;
      setIsLoading(true);
      await deleteReq("/user/following", { id: _id });
      setIsFollowed(false);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full px-10 py-3 flex justify-between items-center hover:bg-sidebar_link_hover border-b border-div_border">
        <Link
          to={`/${username}`}
          onMouseEnter={async () =>
            await queryClient.prefetchQuery(userProfileQuery(username))
          }
          className="flex items-center gap-3"
        >
          <div className="w-10 md:w-12">
            <img src={photo} alt={name} className="w-full rounded-full" />
          </div>
          <div>
            <p>{name}</p>
            <p className="username">@{username}</p>
          </div>
        </Link>
        {isFollowed ? (
          <button
            disabled={isLoading}
            className={isItActualUser ? "following_actual_user" : "following"}
            onClick={handleCancelFollow}
          >
            {isLoading ? <Loading hScreen={false} small={true} /> : "Following"}
          </button>
        ) : (
          <button
            disabled={isLoading}
            className="follow"
            onClick={handleFollow}
          >
            {isLoading ? <Loading hScreen={false} small={true} /> : "Follow"}
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default SingleFollow;
