import { type Post as PostType, User } from "@/types";
import Post from "../../components/Post";
import PostDetails from "../../components/PostDetails";
import { useSelector } from "react-redux";
import { postState } from "@/redux/slice/postSlice";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  post: PostType;
  replyPost: PostType;
  actualUser: User;
  userReply?: boolean;
};

const ReplyPost = ({
  post,
  replyPost,
  actualUser,
  userReply = false,
}: Props) => {
  const navigate = useNavigate();
  const { deletePost } = useSelector(postState);

  const isDeleted = useMemo(() => {
    if (deletePost.includes(post._id)) {
      return true;
    }

    if (deletePost.includes(replyPost._id)) {
      return true;
    }

    return false;
  }, [deletePost, post._id, replyPost._id]);

  useEffect(() => {
    if (isDeleted) {
      navigate(-1);
    }
  }, [isDeleted, navigate]);

  if (isDeleted) return;

  return (
    <>
      <Post post={post} showLine={true} />
      <PostDetails
        post={replyPost}
        actualUser={actualUser}
        userReply={userReply}
        isReply={true}
      />
    </>
  );
};

export default ReplyPost;
