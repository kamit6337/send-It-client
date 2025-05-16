import ReactIcons from "@/assets/icons";
import Loading from "@/lib/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { PARAMS, REPLY } from "@/types";
import useSingleReply from "@/hooks/reply/useSingleReply";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import ReplyPost from "@/components/reply/ReplyPost";
import PostReplies from "../singlePost/PostReplies";
import LeftArrowBtn from "@/components/LeftArrowBtn";

const SingleReply = () => {
  const { id } = useParams() as PARAMS;
  const navigate = useNavigate();
  const { data: actualUser } = useLoginCheck();
  const { isLoading, error, data } = useSingleReply(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="h-96">
        <p>{error.message}</p>
      </div>
    );
  }

  const reply = data as REPLY;

  return (
    <div>
      <LeftArrowBtn title="Reply" />
      <ReplyPost reply={reply} key={reply._id} userReply={true} />
      <PostReplies actualUser={actualUser} id={id} />
      <div className="h-96" />
    </div>
  );
};

export default SingleReply;
