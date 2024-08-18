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
import { Post, User } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import actualDateAndTime from "@/utils/javascript/actualDateAndTime";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "./ui/dialog";

type Props = {
  post: Post;
  actualUser: User;
  userReply?: boolean;
};

const PostDetails = ({ post, actualUser, userReply = false }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();
  const [isFollow, setIsFollow] = useState(post.isFollow);

  useEffect(() => {
    if (post) {
      setIsFollow(post.isFollow);
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
    isSaved,
    saveCount = 0,
    replyCount,
  } = post;

  const isItActualUser = username === actualUser.username;

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await postReq("/user/following", { id: _id });
      setIsFollow(true);
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
      setIsFollow(false);
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
      <div className="w-full flex justify-between items-center py-2 px-5">
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

        <div>
          {isItActualUser ? (
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="text-grey">
                    <ReactIcons.threeDot />
                  </button>
                </DropdownMenuTrigger>
                <PostOptions post={post} />
              </DropdownMenu>
            </Dialog>
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
      </div>

      <div className="px-5">
        <ShowPostMessage message={message} media={media} />
      </div>

      <div
        className={`${
          userReply ? "" : "border-b border-div_border"
        }  py-2 px-5`}
      >
        <p className="text-grey">{actualDateAndTime(createdAt)}</p>
      </div>
      <div className="py-1 border-b border-div_border px-5">
        <LikeAndComment
          postId={postId}
          like={isLiked}
          likeCount={likeCount}
          save={isSaved}
          saveCount={saveCount}
          replyCount={replyCount}
          post={post}
          user={actualUser}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default PostDetails;
