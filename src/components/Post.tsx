import ReactIcons from "@/assets/icons";
import FullScreenImage from "@/components/FullScreenImage";
import PostOptions from "@/components/PostOptions";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import formatRelativeDate from "@/utils/javascript/formatRelativeDate";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike, userInitialState } from "@/redux/slice/userSlice";
import { deleteReq, getReq, postReq } from "@/utils/api/api";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useMemo, useState } from "react";
const imageType = ["png", "jpeg", "jpg"];

const Post = React.memo(({ post, defaultLike = false }) => {
  const dispatch = useDispatch();
  const { actualUser } = useOutletContext();
  const { showErrorMessage } = Toastify();
  const { addLikes, removeLikes } = useSelector(userInitialState);
  const { pathname } = useLocation();
  const [currentPost, setCurrentPost] = useState(post);

  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 50% of the element is in view
    triggerOnce: true, // Only trigger once when it comes into view
  });

  const {
    _id,
    user: { username, name, photo },
    message,
    media,
    likeCount,
    createdAt,
  } = currentPost;

  const isLiked = useMemo(() => {
    if (defaultLike) {
      return defaultLike;
    }

    const addLike = addLikes.find((postId) => postId === _id);
    if (addLike) {
      return true;
    }

    const removeLike = removeLikes.find((postId) => postId === _id);
    if (removeLike) {
      return false;
    }
  }, [_id, defaultLike, addLikes, removeLikes]);

  useEffect(() => {
    if (inView && !isLiked) {
      (async () => {
        try {
          const response = await getReq("/user/like", { id: _id });
          if (!response.data) return;
          dispatch(addLike(response));
        } catch (error) {
          showErrorMessage({
            message:
              error instanceof Error ? error.message : "Somethign went wrong",
          });
        }
      })();
    }
  }, [inView, isLiked, dispatch, showErrorMessage, _id]);

  const handleScroll = () => {
    if (pathname.startsWith(`/${username}`)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleCreateLike = async (id: string) => {
    try {
      await postReq("/user/like", { id });
      dispatch(addLike(id));
      setCurrentPost((prev) => prev.likeCount + 1);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  const handleRemoveLike = async (id: string) => {
    try {
      await deleteReq("/user/like", { id });
      dispatch(removeLike(id));
      setCurrentPost((prev) => prev.likeCount - 1);
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Somethign went wrong",
      });
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="border-b border-div_border w-full px-5 py-3 flex gap-5"
      >
        <div className="w-9 md:w-10">
          <Link to={`/${username}`} onClick={handleScroll}>
            <img src={photo} alt={name} className="w-full rounded-full" />
          </Link>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-user_name text-sm hover:border-b-2 border-user_name">
                <Link to={`/${username}`} onClick={handleScroll}>
                  {name}
                </Link>
              </p>
              <div className="flex items-center">
                <p className="text-grey text-sm">@{username}</p>
                <p className="text-grey">
                  <ReactIcons.dot />
                </p>
                <p className="text-grey text-sm">
                  {formatRelativeDate(createdAt)}
                </p>
              </div>
            </div>

            {username === actualUser.username && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="text-grey">
                    <ReactIcons.threeDot />
                  </button>
                </DropdownMenuTrigger>
                <PostOptions />
              </DropdownMenu>
            )}
          </div>
          <p>{message}</p>

          {imageType.includes(media.split(".").at(-1)) && (
            <Dialog>
              <DialogTrigger>
                <div className="rounded-md h-96 flex justify-center border border-div_border">
                  <img src={media} className="h-full object-cover rounded-md" />
                </div>
              </DialogTrigger>
              <FullScreenImage src={media} />
            </Dialog>
          )}

          {media.endsWith(".mp4") && (
            <video
              className="h-96 rounded-xl border border-div_border"
              controls
            >
              <source src={media} />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="w-full flex justify-between items-center text-grey mt-2">
            <button>
              <ReactIcons.reply />
            </button>
            <div className="flex items-center gap-1">
              {isLiked ? (
                <button
                  className="text-red-500"
                  onClick={() => handleRemoveLike(_id)}
                >
                  <ReactIcons.heartSolid />
                </button>
              ) : (
                <button onClick={() => handleCreateLike(_id)}>
                  <ReactIcons.heartOutline />
                </button>
              )}
              <p className="text-sm">{likeCount}</p>
            </div>
            <button>
              <ReactIcons.views />
            </button>
            <button>
              <ReactIcons.bookMarkOutline />
            </button>
            <button>
              <ReactIcons.share />
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
});

export default Post;
