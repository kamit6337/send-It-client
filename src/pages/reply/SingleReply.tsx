import ReactIcons from "@/assets/icons";
import useReplyPost from "@/hooks/useReplyPost";
import Loading from "@/lib/Loading";
import { useNavigate, useParams } from "react-router-dom";
import useLoginCheck from "@/hooks/useLoginCheck";
import PostReplies from "../post/PostReplies";
import ReplyPost from "@/components/ReplyPost";
import { Params } from "@/types";

const SingleReply = () => {
  const { id } = useParams() as Params;
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
      <ReplyPost actualUser={actualUser} post={post} replyPost={replyPost} />
      <PostReplies actualUser={actualUser} id={id} />
      <div className="h-96" />
    </div>
  );
};

export default SingleReply;
