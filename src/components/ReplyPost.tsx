import { type Post as PostType, User } from "@/types";
import Post from "./Post";
import PostDetails from "./PostDetails";

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
