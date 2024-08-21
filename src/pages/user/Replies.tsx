import ReplyPost from "@/components/ReplyPost";
import useLoginCheck from "@/hooks/useLoginCheck";
import useUserReplies from "@/hooks/useUserReplies";
import Loading from "@/lib/Loading";
import { ReplyFull, User } from "@/types";
import { useOutletContext } from "react-router-dom";

const Replies = () => {
  const { data: actualUser } = useLoginCheck();

  const { user }: { user: User } = useOutletContext();

  const { isLoading, error, data } = useUserReplies(user._id);

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

  const replies = data.data;

  return (
    <section>
      <div>
        {replies.map((reply: ReplyFull) => {
          const { post, replyPost, _id } = reply;

          return (
            <ReplyPost
              key={_id}
              post={post}
              replyPost={replyPost}
              actualUser={actualUser}
              userReply={true}
            />
          );
        })}
      </div>
      <div className="h-96" />
    </section>
  );
};

export default Replies;
