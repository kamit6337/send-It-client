import ReplyPost from "@/components/ReplyPost";
import useLoginCheck from "@/hooks/useLoginCheck";
import useUserReplies from "@/hooks/useUserReplies";
import Loading from "@/lib/Loading";
import { OutletContext, ReplyFull } from "@/types";
import { useOutletContext } from "react-router-dom";

const Replies = () => {
  const { data: actualUser } = useLoginCheck();
  const { user } = useOutletContext<OutletContext>();
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

  if (data?.pages[0].length === 0) {
    return (
      <div className="h-96 flex justify-center items-center">
        You don't have any replies
      </div>
    );
  }

  return (
    <>
      {data?.pages?.map((page) => {
        return page.map((reply: ReplyFull) => {
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
        });
      })}
      <div className="h-96" />
    </>
  );
};

export default Replies;
