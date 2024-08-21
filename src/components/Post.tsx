import ReactIcons from "@/assets/icons";
import PostOptions from "@/components/PostOptions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import formatRelativeDate from "@/utils/javascript/formatRelativeDate";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { getReq } from "@/utils/api/api";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import LikeAndComment from "./LikeAndComment";
import { type Post, User } from "@/types";
import ShowPostMessage from "./ShowPostMessage";
import { Dialog } from "./ui/dialog";
import HoveredUserInfo from "./HoveredUserInfo";

const Post = ({
  post,
  isReply = false,
  showLine = false,
  defaultLike = false,
  defaultSave = false,
}: {
  post: Post;
  isReply?: boolean;
  showLine?: boolean;
  defaultLike?: boolean;
  defaultSave?: boolean;
}) => {
  const navigate = useNavigate();
  const { actualUser }: { actualUser: User } = useOutletContext();
  const { showErrorMessage } = Toastify();
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(defaultLike);
  const [isSaved, setIsSaved] = useState(defaultSave);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showUserInfoOnImg, setShowUserInfoOnImg] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 50% of the element is in view
    triggerOnce: true, // Only trigger once when it comes into view
    rootMargin: "200px 0px", // Trigger 100px before the element enters the viewport
  });

  const {
    _id,
    user: { username, name, photo },
    message,
    media,
    likeCount,
    replyCount,
    saveCount = 0,
    createdAt,
  } = post;

  useEffect(() => {
    if (inView && !isLiked) {
      (async () => {
        try {
          const like = await getReq("/like", { id: _id });

          if (!like) {
            setIsLiked(false);
          } else {
            setIsLiked(true);
          }
        } catch (error) {
          showErrorMessage({
            message:
              error instanceof Error ? error.message : "Somethign went wrong",
          });
        }
      })();
    }
  }, [inView, showErrorMessage, _id, isLiked]);

  useEffect(() => {
    if (inView && !isSaved) {
      (async () => {
        try {
          const save = await getReq("/save", { id: _id });

          if (!save) {
            setIsSaved(false);
          } else {
            setIsSaved(true);
          }
        } catch (error) {
          showErrorMessage({
            message:
              error instanceof Error ? error.message : "Something went wrong",
          });
        }
      })();
    }
  }, [inView, showErrorMessage, _id, isSaved]);

  const handleScroll = () => {
    if (pathname.startsWith(`/${username}`)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNavigate = () => {
    if (!isReply) {
      navigate(`/posts/${_id}`);
      return;
    }
    navigate(`/reply/${_id}`);
  };

  return (
    <>
      <div
        onClick={() => handleNavigate()}
        ref={ref}
        className={`${
          showLine ? "" : "border-b border-div_border"
        }  cursor-pointer  w-full px-5 pt-3 flex gap-5 hover:bg-gray-100`}
      >
        <div className="flex flex-col items-center gap-1 ">
          {/* NOTE: USER PROFILE IMAGE */}
          <div
            className="w-9 md:w-10 relative"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setShowUserInfoOnImg(true)}
            onMouseLeave={() => setShowUserInfoOnImg(false)}
          >
            <Link to={`/${username}`} onClick={handleScroll}>
              <img
                src={photo}
                alt={name}
                className="w-full rounded-full"
                loading="lazy"
              />
            </Link>
            {showUserInfoOnImg && <HoveredUserInfo username={username} />}
          </div>

          {showLine && <div className="h-full w-[2px] bg-div_border" />}
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div
            className="w-full flex justify-between items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              {/* NOTE: USER NAME */}
              <div
                className="relative"
                onMouseEnter={() => setShowUserInfo(true)}
                onMouseLeave={() => setShowUserInfo(false)}
              >
                <Link
                  to={`/${username}`}
                  onClick={handleScroll}
                  className="font-semibold text-user_name text-sm hover:underline underline-offset-4"
                >
                  {name}
                </Link>
                {showUserInfo && <HoveredUserInfo username={username} />}
              </div>

              {/* NOTE: USER USERNAME, CREATED-AT */}
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

            {/* NOTE: SHOW OPTION IN CASE IT IS USER POST */}
            {username === actualUser.username && (
              <div onClick={(e) => e.stopPropagation()}>
                <Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button className="text-grey px-3">
                        <ReactIcons.threeDot />
                      </button>
                    </DropdownMenuTrigger>
                    <PostOptions post={post} isReply={isReply} />
                  </DropdownMenu>
                </Dialog>
              </div>
            )}
          </div>

          {/* NOTE: POST MESSAGE */}
          <ShowPostMessage media={media} message={message} />

          {/* NOTE: POST MESSAGE LIKE, COMMENT, REPLY */}
          <div onClick={(e) => e.stopPropagation()}>
            <LikeAndComment
              post={post}
              user={actualUser}
              postId={_id}
              like={isLiked}
              likeCount={likeCount}
              save={isSaved}
              saveCount={saveCount}
              replyCount={replyCount}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Post;
