import ReactIcons from "@/assets/icons";
import PostOptions from "@/components/PostOptions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import formatRelativeDate from "@/utils/javascript/formatRelativeDate";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import LikeAndComment from "./LikeAndComment";
import { OutletContext, type Post } from "@/types";
import ShowPostMessage from "./ShowPostMessage";
import { Dialog } from "./ui/dialog";
import HoveredUserInfo from "./HoveredUserInfo";
import { useDispatch, useSelector } from "react-redux";
import { addToPost, postState } from "@/redux/slice/postSlice";

const Post = ({
  post,
  isReply = false,
  showLine = false,
}: {
  post: Post;
  isReply?: boolean;
  showLine?: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actualUser } = useOutletContext<OutletContext>();
  const { pathname } = useLocation();
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showUserInfoOnImg, setShowUserInfoOnImg] = useState(false);
  const { updatePost, deletePost } = useSelector(postState);

  useEffect(() => {
    if (post._id) {
      dispatch(addToPost(post._id));
    }
  }, [post._id, dispatch]);

  const newPost = useMemo(() => {
    if (updatePost.length === 0) return post;
    const findPost = updatePost.find((obj) => obj._id === post._id);
    if (findPost) {
      return findPost;
    } else {
      return post;
    }
  }, [post, updatePost]);

  const isDeleted = useMemo(() => {
    if (deletePost.includes(post._id)) {
      return true;
    }
    return false;
  }, [deletePost, post._id]);

  if (isDeleted) return;

  const {
    _id,
    user: { username, name, photo },
    message,
    media,
    createdAt,
  } = newPost;

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

        <div className="flex-1 flex flex-col">
          <div
            className="w-full flex justify-between items-start"
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
                    <DropdownMenuTrigger className="text-grey p-2 hover:bg-gray-300 hover:rounded-full">
                      <ReactIcons.threeDot />
                    </DropdownMenuTrigger>
                    <PostOptions post={newPost} isReply={isReply} />
                  </DropdownMenu>
                </Dialog>
              </div>
            )}
          </div>

          {/* NOTE: POST MESSAGE */}
          <ShowPostMessage media={media} message={message} />

          {/* NOTE: POST MESSAGE LIKE, COMMENT, REPLY */}
          <div onClick={(e) => e.stopPropagation()}>
            <LikeAndComment post={newPost} user={actualUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
