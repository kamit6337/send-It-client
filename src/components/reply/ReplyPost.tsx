import { POST, REPLY } from "@/types";
import Post from "../Post/Post";
import PostDetails from "../Post_Details/PostDetails";
import useLoginCheck from "@/hooks/auth/useLoginCheck";

type Props = {
  reply: REPLY;
  userReply?: boolean;
};

const ReplyPost = ({ reply, userReply = false }: Props) => {
  const { data: actualUser } = useLoginCheck();

  const post = { ...reply, replyPostId: "" } as POST;

  return (
    <>
      <Post post={reply.replyPostId} showLine={true} />
      <PostDetails
        post={post}
        actualUser={actualUser}
        userReply={userReply}
        isReply={true}
      />
    </>
  );
};

export default ReplyPost;
