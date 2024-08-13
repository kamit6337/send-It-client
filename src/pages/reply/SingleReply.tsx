import ReactIcons from "@/assets/icons";
import Post from "@/components/Post";
import useReplyPost from "@/hooks/useReplyPost";
import Loading from "@/lib/Loading";
import { useNavigate, useParams } from "react-router-dom";
import PostDetails from "../post/PostDetails";
import useLoginCheck from "@/hooks/useLoginCheck";
import PostReplies from "../post/PostReplies";

const SingleReply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: actualUser } = useLoginCheck();
  const { isLoading, error, data } = useReplyPost(id);

  if (isLoading) {
    return (
      <div className="h-96">
        <Loading hScreen={false} small={false} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-96">
        <p>{error.message}</p>
      </div>
    );
  }

  const { post, replyPost } = data.data;

  return (
    <div>
      <div className="sticky z-20 top-0 py-2 bg-background flex items-center gap-5 px-5 border-b border-div_border">
        <button className="left_arrow" onClick={() => navigate(-1)}>
          <ReactIcons.leftArrow className="text-xl" />
        </button>
        <p className="text-xl font-semibold tracking-wider">Post</p>
      </div>

      <Post post={post} showLine={true} />
      <div className="px-5">
        <PostDetails post={replyPost} actualUser={actualUser} />
      </div>
      <PostReplies actualUser={actualUser} id={id} />
      <div className="h-96" />
    </div>
  );
};

export default SingleReply;
