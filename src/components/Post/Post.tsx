import ReactIcons from "@/assets/icons";
import PostOptions from "@/components/Post/PostOptions";
import formatRelativeDate from "@/utils/javascript/formatRelativeDate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import LikeAndComment from "./LikeAndComment";
import { POST } from "@/types";
import ShowPostMessage from "./ShowPostMessage";
import { useDispatch, useSelector } from "react-redux";
import { addToPost, postState } from "@/redux/slice/postSlice";
import useLoginCheck from "@/hooks/auth/useLoginCheck";

const Post = ({
  post,
  isReply = false,
  showLine = false,
}: {
  post: POST;
  isReply?: boolean;
  showLine?: boolean;
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { updatePosts, deletePostIds } = useSelector(postState);
  const { data: actualUser } = useLoginCheck();

  useEffect(() => {
    if (post._id) {
      dispatch(addToPost(post._id));
    }
  }, [post._id, dispatch]);

  const newPost = useMemo(() => {
    const isDeleted = deletePostIds.includes(post._id);

    if (isDeleted) return null;

    const findPost = updatePosts.find((obj: POST) => obj._id === post._id);
    if (findPost) {
      return findPost;
    } else {
      return post;
    }
  }, [post, updatePosts, deletePostIds]);

  if (!newPost) return;

  const {
    _id: postId,
    user: { _id: currentUserId, email, name, photo },
    message,
    media,
    createdAt,
  } = newPost;

  const handleScroll = () => {
    if (pathname.startsWith(`/${email}`)) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNavigate = () => {
    if (!isReply) {
      navigate(`/posts/${postId}`);
      return;
    }
    navigate(`/reply/${postId}`);
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
          >
            <Link to={`/${email}`} onClick={handleScroll}>
              <img
                src={photo}
                alt={name}
                className="w-full rounded-full"
                loading="lazy"
              />
            </Link>
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
              <div className="relative">
                <Link
                  to={`/${email}`}
                  onClick={handleScroll}
                  className="font-semibold text-user_name text-sm hover:underline underline-offset-4"
                >
                  {name}
                </Link>
              </div>

              {/* NOTE: USER USERNAME, CREATED-AT */}
              <div className="flex items-center">
                <p className="text-grey text-sm">{email}</p>
                <p className="text-grey">
                  <ReactIcons.dot />
                </p>
                <p className="text-grey text-sm">
                  {formatRelativeDate(createdAt)}
                </p>
              </div>
            </div>

            {/* NOTE: SHOW OPTION IN CASE IT IS USER POST */}
            {currentUserId === actualUser._id && <PostOptions post={newPost} />}
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
