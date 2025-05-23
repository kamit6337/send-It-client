import Loading from "@/lib/Loading";
import { useParams } from "react-router-dom";
import { PARAMS, POST } from "@/types";
import useSingleReply from "@/hooks/reply/useSingleReply";
import useLoginCheck from "@/hooks/auth/useLoginCheck";
import ReplyPost from "@/components/reply/ReplyPost";
import PostReplies from "../singlePost/PostReplies";
import LeftArrowBtn from "@/components/LeftArrowBtn";
import { useEffect } from "react";

const SingleReply = () => {
  const { id } = useParams() as PARAMS;
  const { data: actualUser } = useLoginCheck();
  const { isLoading, error, data } = useSingleReply(id);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);

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

  const reply = data as POST;

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
