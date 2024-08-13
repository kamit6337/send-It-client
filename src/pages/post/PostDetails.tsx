import ReactIcons from "@/assets/icons";
import LikeAndComment from "@/components/LikeAndComment";
import PostOptions from "@/components/PostOptions";
import ShowPostMessage from "@/components/ShowPostMessage";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { deleteReq, postReq } from "@/utils/api/api";
import actualDateAndTime from "@/utils/javascript/actualDateAndTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostDetails = ({ post, actualUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(post);
  const { showErrorMessage } = Toastify();

  useEffect(() => {
    if (post) {
      setCurrentUser(post);
    }
  }, [post]);

  const {
    _id: postId,
    user: { _id, name, username, photo },
    message,
    media,
    createdAt,
    likeCount,
    isLiked,
    isFollow,
  } = currentUser;

  const isItActualUser = username === actualUser.username;

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await postReq("/user/following", { id: _id });
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
      await deleteReq("/user/following", { id: _id });
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

  return (
    <>
      <div className="flex justify-between items-center py-2">
        <div className="flex gap-3">
          <div className="w-9 md:w-10 prevent-navigation">
            <Link to={`/${username}`}>
              <img
                src={photo}
                alt={name}
                className="w-full rounded-full"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="">
            <p className="font-semibold text-user_name text-sm hover:underline underline-offset-4">
              <Link to={`/${username}`}>{name}</Link>
            </p>
            <p className="text-grey text-sm">@{username}</p>
          </div>
        </div>

        {isItActualUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="text-grey">
                <ReactIcons.threeDot />
              </button>
            </DropdownMenuTrigger>
            <PostOptions />
          </DropdownMenu>
        ) : isFollow ? (
          <button
            disabled={isLoading}
            className="w-max self-end following"
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
      </div>
      <ShowPostMessage message={message} media={media} />
      <div className="py-2 border-b border-div_border ">
        <p className="text-grey">{actualDateAndTime(createdAt)}</p>
      </div>
      <div className="py-1 border-b border-div_border">
        <LikeAndComment postId={postId} like={isLiked} likeCount={likeCount} />
      </div>
      <ToastContainer />
    </>
  );
};

export default PostDetails;
