import { POST } from "@/types";
import Post from "../Post/Post";
import PostDetails from "../Post_Details/PostDetails";

type Props = {
  reply: POST;
  userReply?: boolean;
};

const ReplyPost = ({ reply, userReply = false }: Props) => {
  return (
    <>
      {reply.replyPost && <Post post={reply.replyPost} showLine={true} />}
      <PostDetails post={reply} userReply={userReply} />
    </>
  );
};

export default ReplyPost;
