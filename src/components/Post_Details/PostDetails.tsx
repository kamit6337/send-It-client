import { POST, USER } from "@/types";
import actualDateAndTime from "@/utils/javascript/actualDateAndTime";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPost, postState } from "@/redux/slice/postSlice";
import ShowPostMessage from "../Post/ShowPostMessage";
import LikeAndComment from "../Post/LikeAndComment";

type Props = {
  post: POST;
  actualUser: USER;
  userReply?: boolean;
};

const PostDetails = ({ post, actualUser, userReply = false }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    user: { name, email, photo },
    message,
    media,
    createdAt,
  } = newPost;

  return (
    <>
      <div className="w-full flex gap-3 py-2 px-5">
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
    </>
  );
};

export default PostDetails;
