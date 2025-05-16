import ReactIcons from "@/assets/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/lib/Loading";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { POST, USER } from "@/types";
import { deleteReq, postReq } from "@/utils/api/api";
import actualDateAndTime from "@/utils/javascript/actualDateAndTime";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPost, postState } from "@/redux/slice/postSlice";
import ShowPostMessage from "../Post/ShowPostMessage";
import LikeAndComment from "../Post/LikeAndComment";
import { Dialog } from "../ui/dialog";
import PostOptions from "../Post/PostOptions";

type Props = {
  post: POST;
  actualUser: USER;
  userReply?: boolean;
  isReply?: boolean;
};

const PostDetails = ({
  post,
  actualUser,
  userReply = false,
  isReply = false,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { showErrorMessage } = Toastify();
  const [isFollow, setIsFollow] = useState(false);
  const { updatePosts, deletePostIds } = useSelector(postState);

  useEffect(() => {
    if (post._id) {
      dispatch(addToPost(post._id));
    }
  }, [post._id, dispatch]);

  const newPost = useMemo(() => {
    const isDeleted = deletePostIds.includes(post._id);

    if (isDeleted) return null;

    const findPost = updatePosts.find((obj) => obj._id === post._id);

    if (findPost) {
      return findPost;
    }
    return post;
  }, [post, deletePostIds, updatePosts]);

  useLayoutEffect(() => {
    if (!newPost) {
      navigate(-1);
    }
  }, [newPost, navigate]);

  if (!newPost) return;

  const {
    user: { _id, name, email, photo },
    message,
    media,
    createdAt,
  } = newPost;

  const isItActualUser = email === actualUser.email;

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
      <div className="w-full flex justify-between items-start py-2 px-5">
        <div className="flex gap-3">
          <div className="w-9 md:w-10 prevent-navigation">
            <Link to={`/${email}`}>
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
              <Link to={`/${email}`}>{name}</Link>
            </p>
            <p className="text-grey text-sm">{email}</p>
          </div>
        </div>

        <div>
          {isItActualUser ? (
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-grey p-2 hover:bg-gray-300 hover:rounded-full">
                  <ReactIcons.threeDot />
                </DropdownMenuTrigger>
                <PostOptions
                  post={newPost}
                  isReply={isReply}
                  actualUser={actualUser}
                />
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
        <LikeAndComment post={newPost} user={actualUser} />
      </div>
      <ToastContainer />
    </>
  );
};

export default PostDetails;
